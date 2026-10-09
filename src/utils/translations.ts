import { LanguageCode, MachineCategory } from '../types/inspection';

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    appName: 'VRC MACHINERIES',
    tagline: 'Daily Machine Inspection & Maintenance Management',
    freeNotice: '100% Free • Offline Ready',
    
    // Categories
    EARTHMOVING: '1. Earthmoving Machinery',
    VEHICLES_TRANSPORT: '2. Vehicles & Transportation',
    LIFTING_HANDLING: '3. Lifting & Material Handling',
    BOOM_LIFTS_ACCESS: '4. Boom Lifts & Access Equipment',
    DG_POWER: '5. DG Sets & Power Equipment',
    MAIN_PLANTS: '6. Main Construction Plants',
    CONCRETE_ROAD: '7. Concrete & Road Equipment',
    WORKSHOP_FABRICATION: '8. Workshop & Fabrication Machinery',
    PUMPS_UTILITY: '9. Pumps & Utility Equipment',
    MATERIAL_REINFORCEMENT: '10. Material & Reinforcement Equipment',
    VEHICLES_TIPPERS: 'Vehicles and tippers',
    JCB_BACKHOE: 'JCBs and backhoe loaders',
    LOADERS_EXCAVATORS: 'Loaders and excavators',
    HYDRA_CRANES: 'Hydra and cranes',
    COMPACTORS_ROLLERS: 'Soil compactors and rollers',
    DG_SETS: 'DG sets',
    HMP_PLANTS: 'HMP plants',
    RMC_PLANTS: 'RMC plants',
    WMM_PLANTS: 'WMM plants',
    PUMPS_OTHER: 'Pumps and other machinery',

    // Buttons
    btnOk: 'OK',
    btnNotOk: 'NOT OK',
    btnNa: 'N/A',
    btnStartInspection: 'Start Inspection',
    btnSubmit: 'Submit Daily Inspection',
    btnCancel: 'Cancel',
    btnAddMachine: 'Add Machine',
    btnScanQr: 'Scan QR Code',
    btnExportExcel: 'Export Excel (CSV)',
    btnPrintPdf: 'Print / Save PDF',
    btnBackup: 'Backup Data',
    btnRestore: 'Restore Backup',
    
    // Statuses
    statusPass: 'PASS: SAFE FOR OPERATION',
    statusFail: 'FAIL: STOP MACHINE IMMEDIATELY',
    statusAttention: 'NEEDS ATTENTION',
    statusPending: 'PENDING INSPECTION',
    statusSafe: 'SAFE / PASSED',
    statusStopped: 'STOPPED MACHINE',

    // Priorities
    priorityCritical: 'Critical',
    priorityHigh: 'High',
    priorityMedium: 'Medium',
    priorityLow: 'Low',

    // Maintenance
    repairPending: 'Pending',
    repairInProgress: 'In Progress',
    repairCompleted: 'Completed',

    // Form fields
    fieldDate: 'Date & Time',
    fieldSite: 'Project / Site Name',
    fieldMachineType: 'Machine Type',
    fieldMachineNo: 'Machine / Vehicle Number',
    fieldDriver: 'Driver / Operator Name',
    fieldMechanic: 'Mechanic Name (If Any)',
    fieldHourMeter: 'Hour-meter / Kilometre Reading',
    fieldShift: 'Shift',
    shiftDay: 'Day Shift',
    shiftNight: 'Night Shift',
    shiftGeneral: 'General Shift',
    fieldProblem: 'Problem Description',
    fieldPhoto: 'Photo of the Problem',
    fieldAction: 'Action Taken',
    fieldRemarks: 'Remarks',
    fieldSpareParts: 'Spare Parts Required',
    fieldVerification: 'Operator & Supervisor Verification',
    
    // Warnings
    criticalWarning: 'CRITICAL SAFETY DEFECT: Do NOT operate this equipment! Stop the engine immediately until inspected and cleared by an authorized person.',
    mustSelectAll: 'Please check all items above. Tap OK, NOT OK or N/A for each.',
    
    // Dashboard KPIs
    kpiTotal: 'Total Machines',
    kpiCompleted: 'Inspections Done',
    kpiPending: 'Inspections Pending',
    kpiWithDefects: 'Machines with Defects',
    kpiCritical: 'Critical Defects',
    kpiRepairsPending: 'Repairs Pending',
    kpiRepairsDone: 'Repairs Completed',

    // Nav
    navHome: 'Dashboard',
    navMachines: 'Machines',
    navInspect: 'Inspect',
    navDefects: 'Maintenance',
    navReports: 'Reports',
    navAdmin: 'Checklists',
  },

  hi: {
    appName: 'VRC MACHINERIES',
    tagline: 'दैनिक मशीन निरीक्षण एवं रखरखाव प्रबंधन',
    freeNotice: '100% मुफ़्त • ऑफ़लाइन सुविधा',

    // Categories
    EARTHMOVING: '1. अर्थमूविंग मशीनरी (जेसीबी, पोकलेन, रोलर)',
    VEHICLES_TRANSPORT: '2. गाड़ियाँ और ट्रांसपोर्ट (टिपर, मिक्सर, टैंकर)',
    LIFTING_HANDLING: '3. हाइड्रा क्रेन और लिफ्टिंग',
    BOOM_LIFTS_ACCESS: '4. बूम लिफ्ट और एक्सेस उपकरण',
    DG_POWER: '5. डीजी सेट और पावर जनरेटर',
    MAIN_PLANTS: '6. मुख्य निर्माण प्लांट (RMC, HMP, WMM, क्रशर)',
    CONCRETE_ROAD: '7. कंक्रीट व सड़क निर्माण मशीन',
    WORKSHOP_FABRICATION: '8. वर्कशॉप और वेल्डिंग उपकरण',
    PUMPS_UTILITY: '9. पंप और उपयोगिता उपकरण',
    MATERIAL_REINFORCEMENT: '10. सरिया बेंडिंग, कटिंग व साइलो',
    VEHICLES_TIPPERS: 'गाड़ियां और टिपर',
    JCB_BACKHOE: 'जेसीबी और बैकहो लोडर',
    LOADERS_EXCAVATORS: 'लोडर और पोकलेन/एक्सावेटर',
    HYDRA_CRANES: 'हाइड्रा और क्रेन',
    COMPACTORS_ROLLERS: 'रोलर और सॉइल कॉम्पेक्टर',
    DG_SETS: 'डीजी सेट (जनरेटर)',
    HMP_PLANTS: 'एचएमपी हॉट मिक्स प्लांट',
    RMC_PLANTS: 'आरएमसी कंक्रीट प्लांट',
    WMM_PLANTS: 'डब्ल्यूएमएम प्लांट',
    PUMPS_OTHER: 'पंप और अन्य मशीनरी',

    // Buttons
    btnOk: 'ठीक (OK)',
    btnNotOk: 'खराब (NOT OK)',
    btnNa: 'लागू नहीं (N/A)',
    btnStartInspection: 'जाँच शुरू करें',
    btnSubmit: 'निरीक्षण जमा करें',
    btnCancel: 'रद्द करें',
    btnAddMachine: 'नई मशीन जोड़ें',
    btnScanQr: 'क्यूआर स्कैन करें',
    btnExportExcel: 'एक्सेल में डाउनलोड करें (CSV)',
    btnPrintPdf: 'पीडीएफ / प्रिंट करें',
    btnBackup: 'डेटा बैकअप लें',
    btnRestore: 'बैकअप रीस्टोर करें',

    // Statuses
    statusPass: 'पास: मशीन चलाने के लिए सुरक्षित',
    statusFail: 'फेल: मशीन तुरंत बंद करें (खतरा)',
    statusAttention: 'ध्यान देने की आवश्यकता',
    statusPending: 'जाँच बाकी है',
    statusSafe: 'सुरक्षित (पास)',
    statusStopped: 'मशीन बंद (स्टॉप)',

    // Priorities
    priorityCritical: 'अति गंभीर (Critical)',
    priorityHigh: 'उच्च (High)',
    priorityMedium: 'मध्यम (Medium)',
    priorityLow: 'सामान्य (Low)',

    // Maintenance
    repairPending: 'बाकी है',
    repairInProgress: 'काम चालू है',
    repairCompleted: 'ठीक हो गया',

    // Form fields
    fieldDate: 'तारीख और समय',
    fieldSite: 'साइट / प्रोजेक्ट का नाम',
    fieldMachineType: 'मशीन का प्रकार',
    fieldMachineNo: 'मशीन / गाड़ी का नंबर',
    fieldDriver: 'ड्राइवर / ऑपरेटर का नाम',
    fieldMechanic: 'मैकेनिक का नाम (यदि हो)',
    fieldHourMeter: 'घंटा-मीटर या किलोमीटर रीडिंग',
    fieldShift: 'शिफ्ट',
    shiftDay: 'दिन की शिफ्ट',
    shiftNight: 'रात की शिफ्ट',
    shiftGeneral: 'सामान्य शिफ्ट',
    fieldProblem: 'समस्या का विवरण (क्या खराबी है)',
    fieldPhoto: 'समस्या का फोटो',
    fieldAction: 'की गई कार्रवाई (Action Taken)',
    fieldRemarks: 'टिप्पणी (Remarks)',
    fieldSpareParts: 'जरूरी स्पेयर पार्ट्स',
    fieldVerification: 'ऑपरेटर और सुपरवाइजर का सत्यापन',

    // Warnings
    criticalWarning: 'गंभीर सुरक्षा दोष: इस मशीन को बिल्कुल न चलाएं! इंजन तुरंत बंद करें जब तक अधिकृत इंजीनियर इसे ठीक न कर दे।',
    mustSelectAll: 'कृपया ऊपर दिए गए सभी बिंदुओं की जाँच करें। हर एक पर OK, NOT OK या N/A दबाएं।',

    // Dashboard KPIs
    kpiTotal: 'कुल मशीनें',
    kpiCompleted: 'जाँच पूरी हुई',
    kpiPending: 'जाँच बाकी',
    kpiWithDefects: 'खराबी वाली मशीनें',
    kpiCritical: 'गंभीर खराबी',
    kpiRepairsPending: 'मरम्मत बाकी',
    kpiRepairsDone: 'मरम्मत पूरी हुई',

    // Nav
    navHome: 'होम',
    navMachines: 'मशीनें',
    navInspect: 'जाँच',
    navDefects: 'मरम्मत',
    navReports: 'रिपोर्ट्स',
    navAdmin: 'चेकलिस्ट',
  },

  pa: {
    appName: 'VRC MACHINERIES',
    tagline: 'ਰੋਜ਼ਾਨਾ ਮਸ਼ੀਨ ਨਿਰੀਖਣ ਅਤੇ ਰੱਖ-ਰਖਾਅ ਪ੍ਰਬੰਧਨ',
    freeNotice: '100% ਮੁਫ਼ਤ • ਆਫ਼ਲਾਈਨ ਉਪਲਬਧ',

    // Categories
    VEHICLES_TIPPERS: 'ਗੱਡੀਆਂ ਅਤੇ ਟਿੱਪਰ',
    JCB_BACKHOE: 'ਜੇਸੀਬੀ ਅਤੇ ਬੈਕਹੋ ਲੋਡਰ',
    LOADERS_EXCAVATORS: 'ਲੋਡਰ ਅਤੇ ਐਕਸੈਵੇਟਰ',
    HYDRA_CRANES: 'ਹਾਈਡ੍ਰਾ ਅਤੇ ਕਰੇਨ',
    COMPACTORS_ROLLERS: 'ਸੋਇਲ ਕੰਪੈਕਟਰ ਅਤੇ ਰੋਲਰ',
    DG_SETS: 'ਡੀਜੀ ਸੈੱਟ (ਜਨਰੇਟਰ)',
    HMP_PLANTS: 'ਐਚਐਮਪੀ ਹਾਟ ਮਿਕਸ ਪਲਾਂਟ',
    RMC_PLANTS: 'ਆਰਐਮਸੀ ਕੰਕਰੀਟ ਪਲਾਂਟ',
    WMM_PLANTS: 'ਡਬਲਯੂਐਮਐਮ ਪਲਾਂਟ',
    PUMPS_OTHER: 'ਪੰਪ ਅਤੇ ਹੋਰ ਮਸ਼ੀਨਰੀ',

    // Buttons
    btnOk: 'ਠੀਕ ਹੈ (OK)',
    btnNotOk: 'ਖਰਾਬ ਹੈ (NOT OK)',
    btnNa: 'ਲਾਗੂ ਨਹੀਂ (N/A)',
    btnStartInspection: 'ਜਾਂਚ ਸ਼ੁਰੂ ਕਰੋ',
    btnSubmit: 'ਜਾਂਚ ਰਿਕਾਰਡ ਜਮ੍ਹਾਂ ਕਰੋ',
    btnCancel: 'ਰੱਦ ਕਰੋ',
    btnAddMachine: 'ਨਵੀਂ ਮਸ਼ੀਨ ਜੋੜੋ',
    btnScanQr: 'ਕਿਊਆਰ ਸਕੈਨ ਕਰੋ',
    btnExportExcel: 'ਐਕਸਲ ਡਾਊਨਲੋਡ (CSV)',
    btnPrintPdf: 'ਪੀਡੀਐਫ / ਪ੍ਰਿੰਟ ਕਰੋ',
    btnBackup: 'ਬੈਕਅੱਪ ਲਵੋ',
    btnRestore: 'ਬੈਕਅੱਪ ਬਹਾਲ ਕਰੋ',

    // Statuses
    statusPass: 'ਪਾਸ: ਮਸ਼ੀਨ ਚਲਾਉਣ ਲਈ ਸੁਰੱਖਿਅਤ',
    statusFail: 'ਫੇਲ੍ਹ: ਮਸ਼ੀਨ ਤੁਰੰਤ ਬੰਦ ਕਰੋ',
    statusAttention: 'ਧਿਆਨ ਦੇਣ ਦੀ ਲੋੜ ਹੈ',
    statusPending: 'ਜਾਂਚ ਬਾਕੀ ਹੈ',
    statusSafe: 'ਸੁਰੱਖਿਅਤ',
    statusStopped: 'ਬੰਦ ਮਸ਼ੀਨ',

    // Priorities
    priorityCritical: 'ਨਾਜ਼ੁਕ (Critical)',
    priorityHigh: 'ਉੱਚ (High)',
    priorityMedium: 'ਦਰਮਿਆਨਾ (Medium)',
    priorityLow: 'ਘੱਟ (Low)',

    // Maintenance
    repairPending: 'ਬਾਕੀ',
    repairInProgress: 'ਕੰਮ ਚੱਲ ਰਿਹਾ ਹੈ',
    repairCompleted: 'ਪੂਰਾ ਹੋ ਗਿਆ',

    // Form fields
    fieldDate: 'ਮਿਤੀ ਅਤੇ ਸਮਾਂ',
    fieldSite: 'ਸਾਈਟ / ਪ੍ਰੋਜੈਕਟ ਦਾ ਨਾਮ',
    fieldMachineType: 'ਮਸ਼ੀਨ ਦੀ ਕਿਸਮ',
    fieldMachineNo: 'ਮਸ਼ੀਨ / ਗੱਡੀ ਦਾ ਨੰਬਰ',
    fieldDriver: 'ਡਰਾਈਵਰ / ਆਪਰੇਟਰ ਦਾ ਨਾਮ',
    fieldMechanic: 'ਮਕੈਨਿਕ ਦਾ ਨਾਮ (ਜੇ ਕੋਈ ਹੈ)',
    fieldHourMeter: 'ਘੰਟਾ-ਮੀਟਰ ਜਾਂ ਕਿਲੋਮੀਟਰ ਰੀਡਿੰਗ',
    fieldShift: 'ਸ਼ਿਫਟ',
    shiftDay: 'ਦਿਨ ਦੀ ਸ਼ਿਫਟ',
    shiftNight: 'ਰਾਤ ਦੀ ਸ਼ਿਫਟ',
    shiftGeneral: 'ਜਨਰਲ ਸ਼ਿਫਟ',
    fieldProblem: 'ਸਮੱਸਿਆ ਦਾ ਵੇਰਵਾ (ਕੀ ਨੁਕਸ ਹੈ)',
    fieldPhoto: 'ਸਮੱਸਿਆ ਦੀ ਫੋਟੋ',
    fieldAction: 'ਕੀਤੀ ਗਈ ਕਾਰਵਾਈ',
    fieldRemarks: 'ਟਿੱਪਣੀ (Remarks)',
    fieldSpareParts: 'ਲੋੜੀਂਦੇ ਸਪੇਅਰ ਪਾਰਟਸ',
    fieldVerification: 'ਆਪਰੇਟਰ ਅਤੇ ਸੁਪਰਵਾਈਜ਼ਰ ਦੀ ਪੁਸ਼ਟੀ',

    // Warnings
    criticalWarning: 'ਨਾਜ਼ੁਕ ਸੁਰੱਖਿਆ ਨੁਕਸ: ਇਹ ਮਸ਼ੀਨ ਬਿਲਕੁਲ ਨਾ ਚਲਾਓ! ਇੰਜਣ ਤੁਰੰਤ ਬੰਦ ਕਰੋ ਜਦੋਂ ਤੱਕ ਅਧਿਕਾਰਤ ਵਿਅਕਤੀ ਇਸਨੂੰ ਠੀਕ ਨਾ ਕਰ ਦੇਵੇ।',
    mustSelectAll: 'ਕਿਰਪਾ ਕਰਕੇ ਉੱਪਰ ਦਿੱਤੀਆਂ ਸਾਰੀਆਂ ਚੀਜ਼ਾਂ ਦੀ ਜਾਂਚ ਕਰੋ। ਹਰ ਇੱਕ ਲਈ OK, NOT OK ਜਾਂ N/A ਦਬਾਓ।',

    // Dashboard KPIs
    kpiTotal: 'ਕੁੱਲ ਮਸ਼ੀਨਾਂ',
    kpiCompleted: 'ਜਾਂਚ ਪੂਰੀ ਹੋਈ',
    kpiPending: 'ਜਾਂਚ ਬਾਕੀ',
    kpiWithDefects: 'ਨੁਕਸ ਵਾਲੀਆਂ ਮਸ਼ੀਨਾਂ',
    kpiCritical: 'ਨਾਜ਼ੁਕ ਨੁਕਸ',
    kpiRepairsPending: 'ਮੁਰੰਮਤ ਬਾਕੀ',
    kpiRepairsDone: 'ਮੁਰੰਮਤ ਪੂਰੀ ਹੋਈ',

    // Nav
    navHome: 'ਹੋਮ',
    navMachines: 'ਮਸ਼ੀਨਾਂ',
    navInspect: 'ਜਾਂਚ',
    navDefects: 'ਮੁਰੰਮਤ',
    navReports: 'ਰਿਪੋਰਟਾਂ',
    navAdmin: 'ਚੈੱਕਲਿਸਟ',
  },
};

export function t(key: string, lang: LanguageCode = 'en'): string {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
}
