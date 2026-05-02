const { successResponse, errorResponse } = require('../utils/responseHelper')

const EMERGENCY_DATA = {
  Mumbai: {
    city: 'Mumbai', emergencyNumber: '102 / 108', policeNumber: '100', fireNumber: '101',
    keyHospital: 'Lilavati Hospital', hospitalPhone: '022-2675-1000',
    nearbyHospitals: [
      { name: 'Kokilaben Hospital', area: 'Andheri', phone: '022-3066-0000' },
      { name: 'Hinduja Hospital', area: 'Mahim', phone: '022-2445-2222' }
    ]
  },
  Delhi: {
    city: 'Delhi', emergencyNumber: '102 / 108', policeNumber: '100', fireNumber: '101',
    keyHospital: 'AIIMS Emergency', hospitalPhone: '011-2658-8500',
    nearbyHospitals: [
      { name: 'Safdarjung Hospital', area: 'Ansari Nagar', phone: '011-2673-0000' },
      { name: 'RML Hospital', area: 'Connaught Place', phone: '011-2336-5525' }
    ]
  },
  Bangalore: {
    city: 'Bangalore', emergencyNumber: '108', policeNumber: '100', fireNumber: '101',
    keyHospital: 'Manipal Hospital', hospitalPhone: '080-2222-4444',
    nearbyHospitals: [
      { name: 'Fortis Hospital', area: 'Bannerghatta Road', phone: '080-6621-4444' },
      { name: 'Apollo Hospital', area: 'Bannerghatta Road', phone: '080-2630-4050' }
    ]
  },
  Jaipur: {
    city: 'Jaipur', emergencyNumber: '108', policeNumber: '100', fireNumber: '101',
    keyHospital: 'Fortis Escorts', hospitalPhone: '0141-254-7000',
    nearbyHospitals: [
      { name: 'SMS Hospital', area: 'Tonk Road', phone: '0141-256-0291' },
      { name: 'Narayana Hospital', area: 'Jaipur', phone: '0141-302-0000' }
    ]
  },
  Goa: {
    city: 'Goa', emergencyNumber: '108', policeNumber: '100', fireNumber: '101',
    keyHospital: 'GMC Emergency', hospitalPhone: '0832-222-5700',
    nearbyHospitals: [
      { name: 'Manipal Hospital', area: 'Panaji', phone: '0832-246-8888' },
      { name: 'Apollo Victor Hospital', area: 'Margao', phone: '0832-272-1111' }
    ]
  }
}

// @GET /api/emergency/contacts
exports.getEmergencyContacts = async (req, res) => {
  try {
    const contacts = Object.values(EMERGENCY_DATA).map(({ nearbyHospitals, ...c }) => c)
    return successResponse(res, contacts)
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @GET /api/emergency/contacts/:city
exports.getEmergencyContactByCity = async (req, res) => {
  try {
    const city = req.params.city
    const data = EMERGENCY_DATA[city]
    if (!data) return errorResponse(res, 'City not found', 404)
    return successResponse(res, data)
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @GET /api/emergency/hospitals
exports.getNearbyHospitals = async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query
    // Mock hospitals with distances
    const hospitals = [
      { name: 'Lilavati Hospital', area: 'Bandra', distance: 1.2, phone: '022-2675-1000', isOpen24: true, bedsAvailable: 8, lat: 19.0506, lng: 72.8255 },
      { name: 'Kokilaben Hospital', area: 'Andheri', distance: 3.4, phone: '022-3066-0000', isOpen24: true, bedsAvailable: 14, lat: 19.1197, lng: 72.8388 },
      { name: 'Hinduja Hospital', area: 'Mahim', distance: 4.7, phone: '022-2445-2222', isOpen24: true, bedsAvailable: 5, lat: 19.0433, lng: 72.8406 }
    ]
    return successResponse(res, hospitals)
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @POST /api/emergency/ambulance
exports.requestAmbulance = async (req, res) => {
  try {
    const { lat, lng, address, patientName, phone, emergency } = req.body
    const requestId = 'AMB-' + Date.now()
    return successResponse(res, {
      requestId,
      estimatedArrival: '8-12 minutes',
      driver: { name: 'Rajesh Kumar', phone: '+91 98765 43210', vehicle: 'MH-02-AB-1234' },
      status: 'dispatched'
    }, 'Ambulance dispatched successfully')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @GET /api/emergency/pharmacies
exports.getNearbyPharmacies = async (req, res) => {
  try {
    const pharmacies = [
      { name: 'Apollo Pharmacy', area: 'Bandra West', distance: 0.8, phone: '1800-180-8080', isOpen24: true, delivers: true },
      { name: 'MedPlus', area: 'Linking Road', distance: 1.3, phone: '040-6700-6700', isOpen24: true, delivers: true },
      { name: 'Wellness Forever', area: 'Juhu', distance: 2.1, phone: '022-4001-4001', isOpen24: false, delivers: true }
    ]
    return successResponse(res, pharmacies)
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// @POST /api/emergency/insurance-claim
exports.submitInsuranceClaim = async (req, res) => {
  try {
    const { fullName, insuranceProvider, policyNumber, description } = req.body
    const claimId = 'CLM-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 90000 + 10000)
    return successResponse(res, {
      claimId,
      status: 'under_review',
      submittedAt: new Date().toISOString(),
      expectedResponse: '24-48 hours'
    }, 'Insurance claim submitted successfully')
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}
