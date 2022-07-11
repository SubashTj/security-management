import { MenuItem } from "./navigation.model";

export let UserList: MenuItem[] = [
  {
    module: ["overview"],
    name: "Overview",
    type: "link",
    tooltip: "Overview",
    state: "/dashboard",
  },
  {
    module: ["employee_registration"],
    name: "Employees",
    type: "link",
    tooltip: "Employees",
    state: "/employee/list",
  },
  // {
  //   module: ["clients"],
  //   name: "Clients",
  //   type: "link",
  //   tooltip: "Clients",
  //   state: "/client-list",
  // },
  // {
  //   module: ["emp_manual_attendance"],
  //   name: "Attendance",
  //   type: "link",
  //   tooltip: "Attendance",
  //   state: "/employee/manualattendance",
  // },
  // {
  //   module: ["salary", "employee-assign"],
  //   name: "Reports",
  //   type: "dropDown",
  //   tooltip: "Employees",
  //   state: "",
  //   sub: [
  //     {
  //       module: ["salary"],
  //       name: "Salary",
  //       state: "/salary",
  //     },
  //     {
  //       module: ["employee-assign"],
  //       name: "Employee-Assign",
  //       state: "/employee-assign",
  //     }
  //   ]
  // },
  // {
  //   module: [
  //     "theme_setting",
  //     "shift_time_table",
  //     "emp_department",
  //     "emp_position",
  //     "emp_qulaification",
  //     "speciality",
  //     "holiday_setting",
  //     "infastructure",
  //     'emp_attendance_setting',
  //     'stu_attendance_setting',
  //     "holiday_setting",
  //     "layout_category",
  //     "layout_position",
  //     "rule_engine",
  //     "web_setting"
  //   ],
  //   name: "Employee-Settings",
  //   type: "dropDown",
  //   tooltip: "Configuration",
  //   state: "",
  //   sub: [
  //     {
  //       module: ["shift_time_table", "emp_department", "emp_position", "emp_qualification", "speciality", "holiday_setting", "threshold_response_time"],
  //       name: "Employee Settings",
  //       type: "dropDown",
  //       state: "",
  //       sub: [
  //         {
  //           name: "Department",
  //           module: ["emp_department"],
  //           state: "/department/list",
  //         },
  //         {
  //           name: "Designation",
  //           module: ["emp_position"],
  //           state: "/job-position/list",
  //         },
  //         {
  //           name: "Qualification",
  //           module: ["emp_qualification"],
  //           state: "/qualification/list",
  //         },
  //         { name: "Holiday Settings", module: ['holiday_setting'], state: "/holiday-settings/list" },
  //       ],
  //     },
  //     {
  //       name: "Attendance Settings",
  //       module: ['shift_details', 'shift_assign'],
  //       type: "dropDown",
  //       state: "",
  //       sub: [
  //         {
  //           name: "Shift Details",
  //           module: ['shift_details'],
  //           state: "/attendance-settings/shift-details/list-detail",
  //         },
  //         {
  //           name: "Shift Assign",
  //           module: ['shift_assign'],
  //           state: "/attendance-settings/shift-assign/list",
  //         }
  //       ],
  //     },
  //   ]
  // },
]
export let MenuList: MenuItem[] = [
  {
    module: ["overview"],
    name: "Overview",
    type: "link",
    tooltip: "Overview",
    state: "/dashboard",
  },
  {
    module: ["employee_registration"],
    name: "Employees",
    type: "link",
    tooltip: "Employees",
    state: "/employee/list",
  },
  {
    module: ["emp_manual_attendance"],
    name: "Attendance",
    type: "dropDown",
    sub: [
      {
        module: ["emp_manual_attendance"],
        name: "Manual Attendance",
        state: "/employee/manualattendance"
      },
      {
        module: ["office-attendance"],
        name: "Office Attendance",
        state: "/employee/office-attendance"
      }
    ]
  },
  {
    module: ["clients"],
    name: "Branch-Management",
    type: "link",
    tooltip: "Branch",
    state: "/branch/list",
  },
  {
    module: ["district"],
    name: "District-Management",
    type: "link",
    tooltip: "District",
    state: "/district/list",
  },
  {
    module: ["stock-list", "stock-in", "stock-out"],
    name: "Inventory",
    type: "dropDown",
    state: "",
    sub: [
      {
        module: ["inventory"],
        name: "Stock",
        state: "/inventory/stock-list"
      },
      {
        module: ["inventory"],
        name: "Stock-Entry",
        state: "/inventory/stock-in"
      }
    ]
  },
  {
    module: ["quotation"],
    name: "Quotation",
    type: "link",
    tooltip: "Quotation",
    state: "quotation/quotation-list",
  },
  // {
  //   module: ["expense"],
  //   name: "Expense",
  //   type: "link",
  //   tooltip: "Expense",
  //   state: "/expense-list",
  // },
  {
    module: ["account", "expense", "invoice-report", "purchase", "vendors"],
    name: "Accounts",
    type: "dropDown",
    state: "",
    sub: [
      {
        module: ["account"],
        name: "Account Details",
        state: "account/account",
      },
      {
        module: ["expense"],
        name: "Expense",
        state: "expense/expense-list",
      },
      {
        module: ["invoice-report"],
        name: "Invoice-Generation",
        state: "/reports/invoice-report",
      },
      {
        module: ["purchase"],
        name: "Purchase",
        state: "/purchase/purchase-list"
      },
      {
        module: ["vendors"],
        name: "Vendors",
        state: "/vendors/vendor-list"
      },
    ]
  },
  // {
  //   module: ["account"],
  //   name: "Account",
  //   type: "link",
  //   tooltip: "Account",
  //   state: "/account",
  // },
  {
    module: ["salary", "outstaff-report", "invoice","employee-assign", "esi-epf", 'loginandlogout','advance-salary', 'trash'],
    name: "Reports",
    type: "dropDown",
    tooltip: "Employees",
    state: "",
    sub: [
      {
        module: ["file-upload"],
        name: "File-Upload",
        state: "/reports/file-upload",
      },
      {
        module: ["employee-assign"],
        name: "Employee-Assign Report",
        state: "/reports/employee-assign",
      },
      {
        name: "Salary Report",
        module: ['reports'],
        type: "dropDown",
        state: "",
        sub: [
          {
            module: ["salary-report"],
            name: "InStaff-Report",
            state: "/reports/salary-report",
          },
          {
            module: ["outstaff-report"],
            name: "OutStaff-Report",
            state: "/reports/outstaff-report",
          },
          {
            module: ["advance-salary"],
            name: "Advance-Salary Report",
            state: "/reports/advance-salary",
          },
        ],
      },
      {
        module: ["esi-epf"],
        name: "Esi & Epf-Report",
        state: "/reports/esi-epf",
      },
      {
        module: ["tax-deduction"],
        name: "Tax Report",
        state: "/reports/tax-deduction",
      },
      {
        module: ["invoice"],
        name: "Invoice-Report",
        state: "/reports/invoice",
      },
      {
        module: ["loginandlogout"],
        name: "Login-LogOut Report",
        state: "/reports/loginandlogout",
      },
      // {
      //   module: ["printout"],
      //   name: "PrintOut Report",
      //   state: "/reports/printout",
      // },
      {
        module: ["trash"],
        name: "Trash Report",
        state: "/reports/trash",
      },

    ]
  },
  {
    module: [
      "theme_setting",
      "shift_time_table",
      "emp_department",
      "emp_position",
      "emp_qulaification",
      "speciality",
      "expense-settings",
      "inventory-setting",
      "holiday_setting",
      "infastructure",
      'emp_attendance_setting',
      'stu_attendance_setting',
      "holiday_setting",
      "layout_category",
      "layout_position",
      "rule_engine",
      "web_setting",
      "invoice-setting",
      "license-remainder",
      "payment-remainder"
    ],
    name: "Configuration",
    type: "dropDown",
    tooltip: "Configuration",
    state: "",
    sub: [
      {
        module: ["shift_time_table", "emp_department", "emp_position", "emp_qualification", "speciality", "holiday_setting", "threshold_response_time"],
        name: "Employee Settings",
        type: "dropDown",
        state: "",
        sub: [
          {
            name: "Department",
            module: ["emp_department"],
            state: "/department/list",
          },
          {
            name: "Designation",
            module: ["emp_position"],
            state: "/job-position/list",
          },
          {
            name: "Qualification",
            module: ["emp_qualification"],
            state: "/qualification/list",
          },
          { name: "Holiday Settings", module: ['holiday_setting'], state: "/holiday-settings/list" },
        ],
      },
      {
        name: "Inventory Settings",
        module: ['inventory-setting'],
        type: "dropDown",
        state: "",
        sub: [
          {
            name: "Inventory-Type",
            module: ['inventory-type'],
            state: "/inventory-settings/inventory-type",
          },
          {
            name: "Unit-Type",
            module: ['unit-type'],
            state: "/inventory-settings/unit-type",
          },
        ],
      },
      {
        name: "Expense Settings",
        module: ['expense-settings'],
        type: "dropDown",
        state: "",
        sub: [
          {
            name: "Expense-Type",
            module: ['expense-type'],
            state: "/expense-settings/expense-type",
          },
          {
            name: "Transaction-Type",
            module: ['transaction-type'],
            state: "/expense-settings/transaction-type",
          },
        ],
      },
      {
        module: ["license-remainder"],
        name: "License-Remainder",
        type: "link",
        state: "/license-list",
      },
      {
        module: ["payment-remainder"],
        name: "Payment-Remainder",
        type: "link",
        state: "/payment-list",
      },
      {
        module: ["invoice-settings"],
        name: "Invoice-Settings",
        type: "link",
        state: "/invoice-list",
      },
      {
        name: "Attendance Settings",
        module: ['shift_details'],
        type: "dropDown",
        state: "",
        sub: [
          {
            name: "Shift Details",
            module: ['shift_details'],
            state: "/attendance-settings/shift-details/list-detail",
          },
        ],
      },
    ]
  },
]