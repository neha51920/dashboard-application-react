import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownToggle,
} from '@coreui/react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
       Hello, Neha Babariya <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
    </CDropdown>
  )
}

export default AppHeaderDropdown
