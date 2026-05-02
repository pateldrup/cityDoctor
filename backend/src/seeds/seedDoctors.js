require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') })
const mongoose = require('mongoose')
const Doctor = require('../models/Doctor')

const doctors = [
  {
    name: 'Dr. Ananya Sharma', specialty: 'General Physician', hospital: 'City Care Hospital', city: 'Mumbai',
    languages: ['English', 'Hindi'], costRange: { min: 800, max: 1200 }, experience: 12,
    rating: 4.8, reviewCount: 156, isVerified: true, isAvailable: true,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    location: { lat: 19.0820, lng: 72.8890, address: '15, Hill Road', area: 'Bandra West' },
    consultationTypes: ['in-person', 'video'],
    education: [{ degree: 'MBBS', institution: 'AIIMS Delhi', year: 2008 }, { degree: 'MD', institution: 'Mumbai University', year: 2012 }],
    specializations: ['General Checkup', 'Fever & Flu', 'Vaccinations'],
    bio: 'Dr. Ananya Sharma is a highly experienced General Physician with over 12 years of practice in Mumbai.'
  },
  {
    name: 'Dr. Rohan Mehta', specialty: 'Dentist', hospital: 'Smile Dental Clinic', city: 'Mumbai',
    languages: ['English', 'Marathi'], costRange: { min: 500, max: 1000 }, experience: 8,
    rating: 4.9, reviewCount: 89, isVerified: true, isAvailable: true,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    location: { lat: 19.0660, lng: 72.8670, address: 'Smile Plaza', area: 'Andheri West' },
    consultationTypes: ['in-person'],
    education: [{ degree: 'BDS', institution: 'Mumbai University', year: 2010 }],
    specializations: ['Root Canal', 'Dental Implants', 'Orthodontics'],
    bio: 'Dr. Rohan Mehta specializes in cosmetic and restorative dentistry with 8 years of experience.'
  },
  {
    name: 'Dr. Sarah Jenkins', specialty: 'Pediatrician', hospital: "Children's Hope Center", city: 'Delhi',
    languages: ['English', 'French'], costRange: { min: 1200, max: 1800 }, experience: 15,
    rating: 4.7, reviewCount: 210, isVerified: true, isAvailable: true,
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face',
    location: { lat: 28.6239, lng: 77.2190, address: 'Hope Tower, Sector 12', area: 'Dwarka' },
    consultationTypes: ['in-person', 'video'],
    education: [{ degree: 'MBBS', institution: 'Delhi University', year: 2005 }, { degree: 'MD Pediatrics', institution: 'AIIMS', year: 2009 }],
    specializations: ['Child Health', 'Vaccination', 'Newborn Care'],
    bio: 'Dr. Sarah Jenkins is a dedicated pediatrician with 15 years of experience caring for children.'
  },
  {
    name: 'Dr. Meera Iyer', specialty: 'Dermatologist', hospital: 'Skin & Soul Clinic', city: 'Bangalore',
    languages: ['English', 'Tamil', 'Hindi'], costRange: { min: 1000, max: 1500 }, experience: 10,
    rating: 4.6, reviewCount: 134, isVerified: true, isAvailable: true,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face',
    location: { lat: 12.9816, lng: 77.5846, address: '23, Brigade Road', area: 'MG Road' },
    consultationTypes: ['in-person', 'video'],
    education: [{ degree: 'MBBS', institution: 'Bangalore Medical College', year: 2009 }, { degree: 'MD Dermatology', institution: 'NIMHANS', year: 2013 }],
    specializations: ['Skin Disorders', 'Hair Treatment', 'Cosmetic Dermatology'],
    bio: 'Dr. Meera Iyer is a top dermatologist in Bangalore specializing in advanced skin and hair treatments.'
  },
  {
    name: 'Dr. Julian Vance', specialty: 'Orthopedic', hospital: 'Bone & Joint Institute', city: 'Jaipur',
    languages: ['English'], costRange: { min: 900, max: 1400 }, experience: 14,
    rating: 4.5, reviewCount: 67, isVerified: false, isAvailable: false,
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    location: { lat: 26.9224, lng: 75.7973, address: 'Tonk Road', area: 'Malviya Nagar' },
    consultationTypes: ['in-person'],
    education: [{ degree: 'MBBS', institution: 'SMS Medical College', year: 2006 }, { degree: 'MS Orthopedics', institution: 'PGIMER', year: 2010 }],
    specializations: ['Joint Replacement', 'Sports Injuries', 'Spine Surgery'],
    bio: 'Dr. Julian Vance has 14 years of experience in orthopedic surgery and joint replacements.'
  },
  {
    name: 'Dr. Elena Rossi', specialty: 'ENT Specialist', hospital: 'Hear & Speak Clinic', city: 'Goa',
    languages: ['English', 'Italian'], costRange: { min: 1500, max: 2500 }, experience: 20,
    rating: 5.0, reviewCount: 45, isVerified: true, isAvailable: true,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    location: { lat: 15.3093, lng: 74.1340, address: 'Panjim Main Road', area: 'Panjim' },
    consultationTypes: ['in-person', 'video'],
    education: [{ degree: 'MBBS', institution: 'Goa Medical College', year: 2000 }, { degree: 'MS ENT', institution: 'AIIMS', year: 2004 }],
    specializations: ['Hearing Loss', 'Sinusitis', 'Throat Disorders'],
    bio: 'Dr. Elena Rossi brings 20 years of ENT expertise and is fluent in English and Italian.'
  },
  {
    name: 'Dr. Arjun Gupta', specialty: 'Cardiologist', hospital: 'Heart Beat Center', city: 'Delhi',
    languages: ['English', 'Hindi', 'Punjabi'], costRange: { min: 2000, max: 3500 }, experience: 18,
    rating: 4.9, reviewCount: 312, isVerified: true, isAvailable: true,
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=face',
    location: { lat: 28.6039, lng: 77.1990, address: 'South Extension', area: 'New Delhi' },
    consultationTypes: ['in-person', 'video'],
    education: [{ degree: 'MBBS', institution: 'AIIMS Delhi', year: 2002 }, { degree: 'DM Cardiology', institution: 'AIIMS', year: 2008 }],
    specializations: ['Interventional Cardiology', 'ECG & Echo', 'Heart Failure Management'],
    bio: 'Dr. Arjun Gupta is one of Delhi\'s leading cardiologists with 18 years of specialized experience.'
  },
  {
    name: 'Dr. Sophia Lee', specialty: 'Gynecologist', hospital: 'Wellness Women Clinic', city: 'Bangalore',
    languages: ['English', 'Mandarin'], costRange: { min: 1100, max: 1600 }, experience: 9,
    rating: 4.8, reviewCount: 178, isVerified: true, isAvailable: true,
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face',
    location: { lat: 12.9616, lng: 77.6046, address: 'Indiranagar', area: '100 Feet Road' },
    consultationTypes: ['in-person', 'video'],
    education: [{ degree: 'MBBS', institution: 'Manipal University', year: 2010 }, { degree: 'MD OBG', institution: 'St. Johns Medical College', year: 2014 }],
    specializations: ['Prenatal Care', 'High-Risk Pregnancy', 'PCOS Management'],
    bio: 'Dr. Sophia Lee provides comprehensive gynecological care with expertise in high-risk pregnancies.'
  },
  {
    name: 'Dr. Vikram Singh', specialty: 'General Physician', hospital: 'Heritage Health', city: 'Jaipur',
    languages: ['English', 'Hindi'], costRange: { min: 400, max: 800 }, experience: 25,
    rating: 4.4, reviewCount: 234, isVerified: true, isAvailable: true,
    photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face',
    location: { lat: 26.9024, lng: 75.7773, address: 'C Scheme', area: 'Jaipur' },
    consultationTypes: ['in-person'],
    education: [{ degree: 'MBBS', institution: 'SMS Medical College', year: 1996 }, { degree: 'MD Medicine', institution: 'AIIMS', year: 2000 }],
    specializations: ['Chronic Disease', 'Diabetes Management', 'Hypertension'],
    bio: 'Dr. Vikram Singh has 25 years of experience in general medicine and chronic disease management.'
  },
  {
    name: 'Dr. Maria Fernandes', specialty: 'Dentist', hospital: 'Goa Dental Hub', city: 'Goa',
    languages: ['English', 'Portuguese', 'Konkani'], costRange: { min: 600, max: 1200 }, experience: 7,
    rating: 4.7, reviewCount: 56, isVerified: true, isAvailable: true,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face',
    location: { lat: 15.2893, lng: 74.1140, address: 'Margao Centre', area: 'Margao' },
    consultationTypes: ['in-person'],
    education: [{ degree: 'BDS', institution: 'Goa Dental College', year: 2013 }],
    specializations: ['Cosmetic Dentistry', 'Teeth Whitening', 'Braces'],
    bio: 'Dr. Maria Fernandes offers modern dental care in Goa with specialization in cosmetic dentistry.'
  },
  {
    name: 'Dr. Rajesh Iyer', specialty: 'Orthopedic', hospital: 'Apollo Spectra', city: 'Chennai',
    languages: ['English', 'Tamil'], costRange: { min: 1300, max: 2200 }, experience: 16,
    rating: 4.6, reviewCount: 145, isVerified: true, isAvailable: true,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    location: { lat: 13.0927, lng: 80.2807, address: 'T Nagar', area: 'Chennai' },
    consultationTypes: ['in-person', 'video'],
    education: [{ degree: 'MBBS', institution: 'Madras Medical College', year: 2004 }, { degree: 'MS Ortho', institution: 'Christian Medical College', year: 2008 }],
    specializations: ['Arthroscopy', 'Knee Replacement', 'Fracture Management'],
    bio: 'Dr. Rajesh Iyer is a leading orthopedic surgeon in Chennai with expertise in minimally invasive surgery.'
  },
  {
    name: 'Dr. Emily Watson', specialty: 'Psychiatrist', hospital: 'Mind Peace Center', city: 'Chennai',
    languages: ['English'], costRange: { min: 1800, max: 3000 }, experience: 11,
    rating: 4.9, reviewCount: 92, isVerified: true, isAvailable: true,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    location: { lat: 13.0727, lng: 80.2607, address: 'Anna Nagar', area: 'Chennai' },
    consultationTypes: ['in-person', 'video'],
    education: [{ degree: 'MBBS', institution: 'Madras Medical College', year: 2009 }, { degree: 'MD Psychiatry', institution: 'NIMHANS', year: 2013 }],
    specializations: ['Anxiety & Depression', 'Trauma Therapy', 'Addiction Management'],
    bio: 'Dr. Emily Watson is a compassionate psychiatrist helping patients with mental health challenges.'
  }
]

async function seedDoctors() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    let inserted = 0
    let skipped = 0

    for (const doc of doctors) {
      const exists = await Doctor.findOne({ name: doc.name })
      if (!exists) {
        await Doctor.create(doc)
        console.log(`✅ Inserted: ${doc.name}`)
        inserted++
      } else {
        console.log(`⏭  Skipped (exists): ${doc.name}`)
        skipped++
      }
    }

    console.log(`\n🎉 Seeding complete! Inserted: ${inserted}, Skipped: ${skipped}`)
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed error:', err.message)
    process.exit(1)
  }
}

seedDoctors()
