import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import {
  CChartBar
} from '@coreui/react-chartjs';
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);
import { Doughnut, Bar } from 'react-chartjs-2';
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {

  const [selectedStoreName,setSelectedStoreName]=useState('Test-1');
  const [selectStartDate,setSelectStartDate]=useState('2014-01-03');
  const [selectEndDate,setSelectEndDate]=useState('2014-02-11');
  const [dates,setDates]=useState([]);
  const [storeName, setStoreName] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [peopleVisited, setPeopleVisited] = useState(0);
  const [avarageSales, setAvarageSales] = useState(0);
  const [unitPerStore, setUnitPerStore] = useState(0);
  const [totalRevenues, setTotalRevenues] = useState([]);
  const [popularSalesItems, setPopularSalesItems] = useState([])
  const [storeRevenues, setStoreRevenues] = useState([]);

  useEffect(() => {
    fetchData();
    handleSelectStore(selectedStoreName,selectStartDate,selectEndDate);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/getAll');
      const jsonData = await response.json();

      let stores = [];
      let dates = [];
      await jsonData.forEach((item) => {
        stores.push(item.Store);
        dates.push(item.OrderDate);
      });
      setStoreName(stores);
      setDates(dates.sort())

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelectStore = async(selectedStoreName,selectStartDate,selectEndDate) => {
    let store = selectedStoreName;
    let start = selectStartDate;
    let end = selectEndDate;
    const response = await fetch(`http://localhost:4000/getStoreData/${store}?start=${start}&end=${end}`);
    const jsonData = await response.json();
   
    let profit = 0;
      let visitedCustomers = new Set();
      let totalQuantity = 0;
      const totalProfitByMonth = {};
      let popularSaleArr = [];
      let acc = {};
      let storeRevenue = {};
      await jsonData.forEach((item) => {
        //checkprofit
        profit = profit + parseFloat(item.Profit);
        // check visited customer 
        visitedCustomers.add(item["Customer ID"]);
        //check avarage sales
        totalQuantity += item.Quantity;

        //total revenues for chart 
        const orderDate = new Date(item["OrderDate"]);
        const monthYear = orderDate.getFullYear() + '-' + (orderDate.getMonth() + 1);
        if (!totalProfitByMonth[monthYear]) {
          totalProfitByMonth[monthYear] = 0;
        }
        totalProfitByMonth[monthYear] += parseFloat(item.Profit);

        //popular sale item
        const category = item["Category"];
        const sales = parseFloat(item["Sales"]);
        const quantity = parseFloat(item["Quantity"]);

        if (!acc[category]) {
          acc[category] = {
            totalSales: 0,
            totalQuantity: 0,
            count: 0
          };
        }

        acc[category].totalSales += sales;
        acc[category].totalQuantity += quantity;
        acc[category].count++;
        popularSaleArr.push(acc);

        //set store revenue
        const storeIdentifier = `${item.City}, ${item.State}`; // You can modify this to use other identifiers
        const revenue = parseFloat(item.Sales);

        if (!storeRevenue[storeIdentifier]) {
          storeRevenue[storeIdentifier] = 0;
        }
        storeRevenue[storeIdentifier] += revenue;
      });

   
      setStoreRevenues(storeRevenue);
      setTotalProfit(profit);
      setPeopleVisited(visitedCustomers.size);
      setAvarageSales(totalQuantity);
      setUnitPerStore(totalQuantity)
      setTotalRevenues(totalProfitByMonth);

      const categories = Object.keys(acc).map(category => {
        const totalSales = acc[category].totalSales;
        const totalQuantity = acc[category].totalQuantity;
        const count = acc[category].count;
        const apsd = totalSales / 30; // Assuming a month has 30 days
        const upsd = totalQuantity / 30;
        const skuStock = count * 10; // Assuming 10 as SKU stock for each count

        return {
          category: category,
          apsd: apsd.toFixed(2),
          upsd: upsd.toFixed(2),
          skuStock: skuStock
        };
      });

      setPopularSalesItems(categories);

};
  const data = {
    labels: popularSalesItems.map(item => item.category),
    datasets: [
      {
        data: popularSalesItems.map(item => item.skuStock),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
      },
    ],
  };
  const options = {
    plugins: {
      datalabels: {
        display: true,
      }
    }
  };

  const BarOptions = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1,
        width: 1
      },
    },
    responsive: true,
    plugins: {
      legend: false,
      datalabels: {
        display: false,
      }
    },
  };
  const labels = Object.keys(storeRevenues).slice(-6);
  const BarData = {
    labels,
    datasets: [
      {
        data: Object.values(storeRevenues).slice(-6),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <>
      <CRow className='custom__dropdown'>
     
        <CDropdown style={{width:"20%"}}>
          <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
          <CDropdownMenu>
          {[...new Set(storeName)].map((item, index) => (
          <CDropdownItem  active={selectedStoreName == item} onClick={() => {setSelectedStoreName(item);handleSelectStore(item,selectStartDate,selectEndDate)}}>{item}</CDropdownItem>
          ))}</CDropdownMenu>
        </CDropdown>
      
        <CDropdown style={{width:"20%"}}>
          <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
          <CDropdownMenu>
          {[...new Set(dates)].map((item, index) => (
          <CDropdownItem  active={selectedStoreName == item} onClick={() => {setSelectStartDate(item);handleSelectStore(selectedStoreName,item,selectEndDate)}}>{item}</CDropdownItem>
          ))}</CDropdownMenu>
        </CDropdown>
      
      
        <CDropdown style={{width:"20%"}}>
          <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
          <CDropdownMenu>
          {[...new Set(dates)].map((item, index) => (
          <CDropdownItem  active={selectedStoreName == item} onClick={() => {setSelectStartDate(item);handleSelectStore(selectedStoreName,selectStartDate,item)}}>{item}</CDropdownItem>
          ))}</CDropdownMenu>
        </CDropdown>
      
      </CRow>
      <WidgetsDropdown className="mb-4" totalProfit={totalProfit} peopleVisited={peopleVisited} avarageSales={avarageSales} unitPerStore={unitPerStore} />
      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody>
            <CCardTitle>  Total Revenue </CCardTitle>
              <CChartBar
                data={{
                  scaleId: 'yaxis-0',
                  labels: Object.keys(totalRevenues)
                    .slice(-14)
                    .map(month => {
                      const date = new Date(`${month}-01`);
                      return date.toLocaleString('en-US', { month: 'short' });
                    }).slice(-11),
                  datasets: [
                    {
                      label: 'Total Revenue',
                      backgroundColor: '#a5ccdb',
                      data: Object.values(totalRevenues).slice(-11),
                    },
                  ],
                }}
                options={{
                  plugins: {
                    datalabels: {
                      display: false,
                    }
                  }
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCardTitle>Top Popular Sales Item</CCardTitle>
                <CTable align="middle" className="mb-0" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Item Category</CTableHeaderCell>
                      <CTableHeaderCell scope="col">APSD</CTableHeaderCell>
                      <CTableHeaderCell scope="col">UPSD</CTableHeaderCell>
                      <CTableHeaderCell scope="col">SKU Stock</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {popularSalesItems?.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{item.category}</CTableDataCell>
                        <CTableDataCell>{item.apsd}</CTableDataCell>
                        <CTableDataCell>{item.upsd}</CTableDataCell>
                        <CTableDataCell className="progress-group-bars">
                          {/* devideby 1000 is used only for represent the data  */}
                          <CProgress thin color="warning" value={(item.skuStock)} />
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow style={{ height: '100%' }}>
        <CCol xs={12} md={4}>
          <CCard className="mb-4">
            <CCardHeader>Sales By Category</CCardHeader>
            <CCardBody>
              <Doughnut data={data} options={options} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={4}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCardTitle>Today's weather - 8°C</CCardTitle>
                <span>People always buy below item in this weather</span>
                <CTable align="middle" className="mb-0" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Item Category</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Stock Status</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {popularSalesItems.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{item.category}</CTableDataCell>
                        <CTableDataCell className="progress-group-bars">
                          {item.skuStock < 20 ? "Low Stock" : "In Stock"}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={4}>
          <CCard className="mb-4">
            <CCardHeader>Store Revenue</CCardHeader>
            <CCardBody>
              <Bar options={BarOptions} data={BarData} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard