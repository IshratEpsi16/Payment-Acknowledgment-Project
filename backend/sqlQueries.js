// sqlQueries.js

const queries = {
  getCustomTableData:
    `select * from XXCRM.XXSSGIL_CASH_PAY_MAS
    where   JOB_LOCATION in ('Corporate Office','Rangpur','Bogra','Comilla','Mymensing','Gazipur','Narshindi','Sylhet','Tongi','Khulna','Faridpur Office','Jhenaidah')    
    order by PAYEE_ID`,
    getCustomTableDataScblFo:
    `select * from XXCRM.XXSSGIL_CASH_PAY_MAS
    where    JOB_LOCATION in ('Kaligonj Factory Office')    
    order by PAYEE_ID`,
    getCustomTableDataSSCML:
    `       select * from XXCRM.XXSSGIL_CASH_PAY_MAS
    where    JOB_LOCATION in ('Labanchora Factory office')    
    order by PAYEE_ID `,
    getCustomTableDataSSCIL:
    `   select * from XXCRM.XXSSGIL_CASH_PAY_MAS
     where 1=1
     and JOB_LOCATION ='Shikolbaha Office Factory'
      order by payee_id `,

      getCustomTableDataCtg:
      `   select * from XXCRM.XXSSGIL_CASH_PAY_MAS
        where 1=1
        and JOB_LOCATION ='Chittagong'
         order by payee_id `,
  getAllData: `
  select * from XXCRM.XXSSGIL_CASH_PAY_MAS
  where    JOB_LOCATION in ('Corporate Office','Rangpur','Bogra','Comilla','Mymensing','Gazipur','Narshindi','Sylhet','Tongi','Khulna','Faridpur Office','Jhenaidah')    
  order by PAYEE_ID
    `,
    getAllDataScblFo: `
    select * from XXCRM.XXSSGIL_CASH_PAY_MAS
    where    JOB_LOCATION in ('Kaligonj Factory Office')    
    order by PAYEE_ID
    `,
    getAllDataSSCML: `
    select * from XXCRM.XXSSGIL_CASH_PAY_MAS
    where    JOB_LOCATION in ('Labanchora Factory office')    
    order by PAYEE_ID 
        `,
        getAllDataSSCIL: `
        select * from XXCRM.XXSSGIL_CASH_PAY_MAS
        where 1=1
        and JOB_LOCATION ='Shikolbaha Office Factory'
         order by payee_id   
            `,
            getAllDataCtg:
            `   select * from XXCRM.XXSSGIL_CASH_PAY_MAS
                    where 1=1
                    and JOB_LOCATION ='Chittagong'
                     order by payee_id `,
  getNotificationsById: `
    select * 
    from XXSSGIL_ADMIN_SIGNUP XAST,
    XXCRM.XXSSGIL_CASH_PAY_MAS XCPD
     where 1=1
     and XAST.EMPLOYEE_ID = XCPD.PAYEE_ID
     AND  XCPD.STATUS = 'Sent' 
     AND XAST.EMPLOYEE_ID = :id
    `,
  getProfileInfoById: `
      SELECT * FROM XXSSGIL_ADMIN_SIGNUP WHERE EMPLOYEE_ID = :empId
    `,
  updateStatus: `
  UPDATE XXCRM.XXSSGIL_CASH_PAY_MAS
  SET STATUS = :newStatus,
      LAST_UPDATE_DATE = SYSDATE,
      LAST_UPDATED_BY = :payeeId
  WHERE 1=1
  AND PAYEE_ID = :payeeId
  AND PAYROLL_MONTH = :currentPeriod
  AND STATUS = 'Sent'
  and JOB_LOCATION in ('Corporate Office','Rangpur','Bogra','Comilla','Mymensing','Gazipur','Narshindi','Sylhet','Tongi','Khulna','Faridpur Office','Jhenaidah')    
`,
updateStatusScblFo: `
UPDATE XXCRM.XXSSGIL_CASH_PAY_MAS
SET STATUS = :newStatus,
    LAST_UPDATE_DATE = SYSDATE,
    LAST_UPDATED_BY = :payeeId
WHERE 1=1
AND PAYEE_ID = :payeeId
AND PAYROLL_MONTH = :currentPeriod
AND STATUS = 'Sent'
and    JOB_LOCATION in ('Kaligonj Factory Office') 
`,
updateStatusSSCML: `
UPDATE XXCRM.XXSSGIL_CASH_PAY_MAS
SET STATUS = :newStatus,
    LAST_UPDATE_DATE = SYSDATE,
    LAST_UPDATED_BY = :payeeId
WHERE 1=1
AND PAYEE_ID = :payeeId
AND PAYROLL_MONTH = :currentPeriod
AND STATUS = 'Sent'
and JOB_LOCATION = 'Labanchora Factory office'

`,
updateStatusSSCIL: `
UPDATE XXCRM.XXSSGIL_CASH_PAY_MAS
SET STATUS = :newStatus,
    LAST_UPDATE_DATE = SYSDATE,
    LAST_UPDATED_BY = :payeeId
WHERE 1=1
AND PAYEE_ID = :payeeId
AND PAYROLL_MONTH = :currentPeriod
AND STATUS = 'Sent'
and JOB_LOCATION ='Shikolbaha Office Factory'

`,
  updateTable: `
  UPDATE XXCRM.XXSSGIL_CASH_PAY_MAS
  SET STATUS =  'Sent',
      CREATION_DATE = SYSDATE,
      TRANSACTION_ID= xxcrm.XXSSGIL_CASH_PAY_S.nextval
      
  WHERE 1=1
  AND PAYEE_ID = :payeeId
  AND PAYROLL_MONTH = :currentPeriod
  and JOB_LOCATION in ('Corporate Office','Rangpur','Bogra','Comilla','Mymensing','Gazipur','Narshindi','Sylhet','Tongi','Khulna','Faridpur Office','Jhenaidah')    
`
  ,
  updateTableScblFo: `
  UPDATE XXCRM.XXSSGIL_CASH_PAY_MAS
  SET STATUS =  'Sent',
      CREATION_DATE = SYSDATE,
      TRANSACTION_ID= xxcrm.XXSSGIL_CASH_PAY_S.nextval
      
  WHERE 1=1
  AND PAYEE_ID = :payeeId
  AND PAYROLL_MONTH = :currentPeriod
  and    JOB_LOCATION in ('Kaligonj Factory Office')
`,
updateTableSSCML: `
UPDATE XXCRM.XXSSGIL_CASH_PAY_MAS
SET STATUS =  'Sent',
    CREATION_DATE = SYSDATE,
    TRANSACTION_ID= xxcrm.XXSSGIL_CASH_PAY_S.nextval
    
WHERE 1=1
AND PAYEE_ID = :payeeId
AND PAYROLL_MONTH = :currentPeriod
and JOB_LOCATION = 'Labanchora Factory office'
`,
updateTableSSCIL: `
UPDATE XXCRM.XXSSGIL_CASH_PAY_MAS
SET STATUS =  'Sent',
    CREATION_DATE = SYSDATE,
    TRANSACTION_ID= xxcrm.XXSSGIL_CASH_PAY_S.nextval
    
WHERE 1=1
AND PAYEE_ID = :payeeId
AND PAYROLL_MONTH = :currentPeriod
and JOB_LOCATION ='Shikolbaha Office Factory'
`
,

updateStatusCtg: `
UPDATE XXCRM.XXSSGIL_CASH_PAY_MAS
SET STATUS = :newStatus,
    LAST_UPDATE_DATE = SYSDATE,
    LAST_UPDATED_BY = :payeeId
WHERE 1=1
AND PAYEE_ID = :payeeId
AND PAYROLL_MONTH = :currentPeriod
AND STATUS = 'Sent'
and JOB_LOCATION ='Chittagong'

`,
updateTableCtg: `
UPDATE XXCRM.XXSSGIL_CASH_PAY_MAS
SET STATUS =  'Sent',
    CREATION_DATE = TO_DATE(SYSDATE),
    TRANSACTION_ID= xxcrm.XXSSGIL_CASH_PAY_S.nextval
    
WHERE 1=1
AND PAYEE_ID = :payeeId
AND PAYROLL_MONTH = :currentPeriod
and JOB_LOCATION ='Chittagong'
`
,


  login: `
  SELECT *
  FROM XXSSGIL_ADMIN_SIGNUP S
  LEFT OUTER JOIN XXCRM.XXSSGIL_CASH_PAY_MAS M
  ON S.EMPLOYEE_ID = TO_CHAR(M.PAYEE_ID)
  WHERE S.EMPLOYEE_ID = TO_CHAR(:employee_id)
  AND S.EMPLOYEE_PASSWORD = STANDARD_HASH(:employee_password)
    `,
  signup: `
  INSERT INTO XXSSGIL_ADMIN_SIGNUP(Employee_ID, Employee_Name,NID_NO, Phone_Number, Email, Employee_Password, Confirm_Password)
  VALUES (:employee_id, :employee_name, :nid_no, :phone_number, :email,STANDARD_HASH(:employee_password) , STANDARD_HASH(:confirm_password))
    `,
  checkIdExists: `
    SELECT *
    FROM XXSSGIL_ADMIN_SIGNUP
    WHERE Employee_ID = :employee_id
`,
  // createRecord: `
  //     INSERT INTO XXCRM.XXSSGIL_CASH_PAY_MAS(
  //       TRANSACTION_ID, PAYEE_ID, PAYEE_NAME, CASH_AMOUNT, STATUS, MAIL_ADDRESS, CURRENT_PERIOD, CREATION_DATE
  //     )
  //     VALUES (
  //       xxcrm.XXSSGIL_CASH_PAY_S.nextval, :payee_id, :payee_name, :cash_amount, 'Sent', :mail_address,
  //       TO_CHAR(TO_DATE(:current_period, 'MM/DD/YYYY HH:MI:SS AM'), 'Mon-YY'),
  //       FROM_TZ(CAST(SYSDATE AS TIMESTAMP), 'UTC') AT TIME ZONE 'Asia/Dhaka'
  //     )
  //   `,
  checkIdExists: `
    SELECT *
    FROM XXSSGIL_ADMIN_SIGNUP
    WHERE Employee_ID = :employee_id
`,


  forgetpassword: `SELECT * FROM XXSSGIL_ADMIN_SIGNUP WHERE EMPLOYEE_ID = :empId AND NID_NO = :nid`,
  updatepassword: `UPDATE XXSSGIL_ADMIN_SIGNUP SET EMPLOYEE_PASSWORD = STANDARD_HASH(:newPassword), CONFIRM_PASSWORD = STANDARD_HASH(:confirmPassword) WHERE EMPLOYEE_ID = :empId`,
};

module.exports = queries;