import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CCard, CCardTitle, CCardText, CCardBody,
  CCardImage
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import Revenue from '../../assets/images/navIcons/total-revenues.png'
import PeopleVisited from '../../assets/images/navIcons/people-visited.png'
import APSD from '../../assets/images/navIcons/APSD.png'
import UPSD from '../../assets/images/navIcons/UPSD.png'


const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CCard style={{ height: '100%' }}>
          <CCardBody className='d-flex align-items-center justify-content-space-evenly'>
            <CCardImage
              component="img"
              orientation="top"
              className="img-fluid"
              src={Revenue}
              alt="Total Revenue Image"
              style={{ width: 'auto', height: 'auto' }}
            />
            <div>
              <CCardTitle>Total Revenue</CCardTitle>
              <CCardTitle>{props?.totalProfit.toLocaleString('en-IN', {
                maximumFractionDigits: 0,
                style: 'currency',
                currency: 'USD'
              })}</CCardTitle>
              <CCardText><span style={{ fontSize: 'small', color: 'gray' }}>Deposite - $3000</span></CCardText>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CCard style={{ height: '100%' }}>
          <CCardBody className='d-flex align-items-center justify-content-space-evenly'>
            <CCardImage
              component="img"
              orientation="top"
              className="img-fluid"
              src={PeopleVisited}
              style={{ width: 'auto', height: 'auto' }}
            />
            <div>
              <CCardTitle>People visited</CCardTitle>
              <CCardTitle>{props.peopleVisited}</CCardTitle>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
      <CCard style={{ height: '100%' }}>
          <CCardBody className='d-flex align-items-center justify-content-space-evenly'>
            <CCardImage
              component="img"
              orientation="top"
              className="img-fluid"
              src={APSD}
              alt="Total Revenue Image"
              style={{ width: 'auto', height: 'auto' }}
            />
            <div>
              <CCardTitle>Average per store day</CCardTitle>
              <CCardTitle>{props?.avarageSales.toLocaleString('en-IN', {
                maximumFractionDigits: 0,
                style: 'currency',
                currency: 'USD'
              })}</CCardTitle>
             </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
      <CCard style={{ height: '100%' }}>
          <CCardBody className='d-flex align-items-center justify-content-space-evenly'>
            <CCardImage
              component="img"
              orientation="top"
              className="img-fluid"
              src={UPSD}
              alt="Total Revenue Image"
              style={{ width: 'auto', height: 'auto' }}
            />
            <div>
              <CCardTitle>Unit per store day</CCardTitle>
              {/* devide by 2 is just add for diffrenciate data */}
              <CCardTitle>{(props?.unitPerStore/2).toLocaleString('en-IN', {
                maximumFractionDigits: 0,
                style: 'currency',
                currency: 'USD'
              })}</CCardTitle>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
