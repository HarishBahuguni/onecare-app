-- profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'reception', 'physio')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can manage profiles" ON profiles FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- patients
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('M', 'F', 'O')),
  dob DATE,
  phone TEXT,
  email TEXT,
  address TEXT,
  emergency_contact TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reception and physio can view patients" ON patients FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('reception', 'physio', 'admin')));
CREATE POLICY "Reception and admin can manage patients" ON patients FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('reception', 'admin')));

-- doctors
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  license_no TEXT,
  specialization TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "All roles can view doctors" ON doctors FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles));
CREATE POLICY "Only admin can manage doctors" ON doctors FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES doctors(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reception and physio can view appointments" ON appointments FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('reception', 'physio', 'admin')));
CREATE POLICY "Reception and admin can manage appointments" ON appointments FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('reception', 'admin')));

-- sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES doctors(id),
  session_date DATE NOT NULL,
  session_time TIME NOT NULL,
  duration_minutes INT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Physio and reception can view sessions" ON sessions FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('physio', 'reception', 'admin')));
CREATE POLICY "Physio and admin can manage sessions" ON sessions FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('physio', 'admin')));