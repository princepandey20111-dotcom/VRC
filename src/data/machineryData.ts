import { Machine, ChecklistItem, MachineCategory } from '../types/inspection';

/**
 * VRC MACHINERIES
 * P&M Department – Important Machinery Master List (105 Machines)
 *
 * Developed by: Prince Pandey
 * Instructed by: Mr. Anuj Kumar
 * Under the guidance of: Hon. Mr. Dhruv Gupta and Kanishq Bansal
 */

export interface MasterTemplate {
  number: number;
  name: string;
  category: MachineCategory;
  defaultMake: string;
  defaultCapacity: string;
  prefix: string;
  photoUrl: string;
}

export const PM_MASTER_CATALOG: MasterTemplate[] = [
  // 1. Earthmoving Machinery (1-10)
  { number: 1, name: 'Excavator', category: 'EARTHMOVING', defaultMake: 'Tata Hitachi / CAT 320D2', defaultCapacity: '20 Ton (0.92 m³ Bucket)', prefix: 'EXC', photoUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80' },
  { number: 2, name: 'Backhoe Loader (JCB)', category: 'EARTHMOVING', defaultMake: 'JCB 3DX Super 4WD', defaultCapacity: '76 HP / 1.0 m³ Loader', prefix: 'JCB', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 3, name: 'Wheel Loader', category: 'EARTHMOVING', defaultMake: 'Liugong 856H / CAT 950', defaultCapacity: '3.0 m³ Bucket / 5 Ton', prefix: 'WLD', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 4, name: 'Bulldozer / Dozer', category: 'EARTHMOVING', defaultMake: 'BEML BD80 / CAT D6R', defaultCapacity: '180 HP Semi-U Blade', prefix: 'DOZ', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 5, name: 'Motor Grader', category: 'EARTHMOVING', defaultMake: 'Mahindra RoadMaster / CAT 120K', defaultCapacity: '145 HP / 12 ft Blade', prefix: 'MGD', photoUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80' },
  { number: 6, name: 'Skid Steer Loader', category: 'EARTHMOVING', defaultMake: 'Bobcat S590 / JCB 155', defaultCapacity: '68 HP / 850 kg Payload', prefix: 'SSL', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 7, name: 'Soil Compactor', category: 'EARTHMOVING', defaultMake: 'Hamm 311D / Case 1107EX', defaultCapacity: '11 Ton Vibratory Drum', prefix: 'SCM', photoUrl: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=600&q=80' },
  { number: 8, name: 'Single Drum Roller', category: 'EARTHMOVING', defaultMake: 'Dynapac CA 250D', defaultCapacity: '12 Ton Smooth Drum', prefix: 'SDR', photoUrl: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=600&q=80' },
  { number: 9, name: 'Double Drum Roller', category: 'EARTHMOVING', defaultMake: 'Hamm HD 90 / Ammann', defaultCapacity: '9 Ton Tandem Vibratory', prefix: 'DDR', photoUrl: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=600&q=80' },
  { number: 10, name: 'Pneumatic Tyre Roller', category: 'EARTHMOVING', defaultMake: 'BOMAG BW 24 RH / Hamm GRW', defaultCapacity: '24 Ton 8-Tyre Asphalt', prefix: 'PTR', photoUrl: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=600&q=80' },

  // 2. Vehicles and Transportation (11-24)
  { number: 11, name: 'Transit Mixer', category: 'VEHICLES_TRANSPORT', defaultMake: 'Schwing Stetter / Tata 2828', defaultCapacity: '6 m³ / 7 m³ Drum', prefix: 'TMX', photoUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80' },
  { number: 12, name: 'Tipper / Dumper', category: 'VEHICLES_TRANSPORT', defaultMake: 'Tata Signa 2823.K / Leyland', defaultCapacity: '16 m³ / 28 Ton GVW', prefix: 'TIP', photoUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80' },
  { number: 13, name: 'Tractor Trolley', category: 'VEHICLES_TRANSPORT', defaultMake: 'Mahindra 575 DI / Swaraj 855', defaultCapacity: '45 HP / 5 Ton Hydraulic Trolley', prefix: 'TRT', photoUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80' },
  { number: 14, name: 'Tractor Loader', category: 'VEHICLES_TRANSPORT', defaultMake: 'Sonalika DI 60 + Front Loader', defaultCapacity: '60 HP / 0.5 m³ Loader', prefix: 'TRL', photoUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80' },
  { number: 15, name: 'Water Tanker', category: 'VEHICLES_TRANSPORT', defaultMake: 'Ashok Leyland 2820 Water Sprayer', defaultCapacity: '12,000 Litres + Spray Bar', prefix: 'WTK', photoUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80' },
  { number: 16, name: 'Diesel Tanker / Fuel Bowser', category: 'VEHICLES_TRANSPORT', defaultMake: 'Eicher Pro 3015 Fuel Dispenser', defaultCapacity: '6,000 Litres with Flow Meter', prefix: 'DTK', photoUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80' },
  { number: 17, name: 'Bitumen Tanker', category: 'VEHICLES_TRANSPORT', defaultMake: 'Tata 2518 Insulated Tanker', defaultCapacity: '18,000 Litres + Heating Burner', prefix: 'BTK', photoUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80' },
  { number: 18, name: 'Cement Bulker', category: 'VEHICLES_TRANSPORT', defaultMake: 'BharatBenz 3528C Pressurized', defaultCapacity: '32 Ton Pneumatic Discharge', prefix: 'BLK', photoUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80' },
  { number: 19, name: 'Concrete Pump', category: 'VEHICLES_TRANSPORT', defaultMake: 'Putzmeister BSA 1407D Trailer', defaultCapacity: '70 m³/h / 106 bar Pressure', prefix: 'CPT', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 20, name: 'Boom Placer', category: 'VEHICLES_TRANSPORT', defaultMake: 'Schwing Stetter S36X on Tata 3128', defaultCapacity: '36 Meter 4-Section R-Fold', prefix: 'BMP', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 21, name: 'Pickup / Utility Vehicle', category: 'VEHICLES_TRANSPORT', defaultMake: 'Mahindra Bolero Camper 4WD', defaultCapacity: '1.2 Ton Site Utility', prefix: 'UTL', photoUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80' },
  { number: 22, name: 'Truck / Trailer', category: 'VEHICLES_TRANSPORT', defaultMake: 'Tata Prima 5530.S Low-bed Bed', defaultCapacity: '55 Ton Low-bed 3-Axle', prefix: 'TRK', photoUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80' },
  { number: 23, name: 'Ambulance', category: 'VEHICLES_TRANSPORT', defaultMake: 'Force Traveller Site Medical Van', defaultCapacity: 'BLS Equipped Site Clinic', prefix: 'AMB', photoUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80' },
  { number: 24, name: 'Service Van', category: 'VEHICLES_TRANSPORT', defaultMake: 'Tata 407 Workshop Mobile Van', defaultCapacity: 'Compressor + Welder + Tool Chest', prefix: 'SVN', photoUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80' },

  // 3. Lifting and Material Handling (25-32)
  { number: 25, name: 'Hydra Crane – 9 / 12 / 14 / 16 / 20 / 25 Ton', category: 'LIFTING_HANDLING', defaultMake: 'ACE 14XW / Escorts TRX 2319', defaultCapacity: '14 Ton Pick & Carry Boom', prefix: 'HYD', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 26, name: 'Mobile Crane', category: 'LIFTING_HANDLING', defaultMake: 'Zoomlion QY50V / Tadano', defaultCapacity: '50 Ton All Terrain Telescopic', prefix: 'MCR', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 27, name: 'Crawler Crane', category: 'LIFTING_HANDLING', defaultMake: 'Sany SCC800C Heavy Lattice', defaultCapacity: '80 Ton Lattice Boom', prefix: 'CCR', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 28, name: 'Tower Crane', category: 'LIFTING_HANDLING', defaultMake: 'Potain MCi 85 A / Liebherr', defaultCapacity: '5 Ton Max / 50m Jib Length', prefix: 'TCR', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 29, name: 'Forklift', category: 'LIFTING_HANDLING', defaultMake: 'Godrej G300D / Toyota 8FD30', defaultCapacity: '3.0 Ton Diesel 4.5m Mast', prefix: 'FLT', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 30, name: 'Telehandler', category: 'LIFTING_HANDLING', defaultMake: 'JCB 540-170 / Manitou MT-X', defaultCapacity: '4.0 Ton / 17 Meter Reach', prefix: 'TLH', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 31, name: 'Passenger / Material Hoist', category: 'LIFTING_HANDLING', defaultMake: 'Alimak Scando 650 / Spartan', defaultCapacity: '2.0 Ton / Dual Cage 60m', prefix: 'HST', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 32, name: 'Electric Chain Hoist', category: 'LIFTING_HANDLING', defaultMake: 'Indef / Demag Cranes', defaultCapacity: '5 Ton Gantry Monorail', prefix: 'ECH', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },

  // 4. Boom Lifts and Access Equipment (33-38)
  { number: 33, name: 'Boom Lift – 30 / 40 / 60 / 80 / 90 / 100 / 120 / 135 ft', category: 'BOOM_LIFTS_ACCESS', defaultMake: 'JLG 600AJ / Genie Z-60', defaultCapacity: '60 ft Working Height (18.3m)', prefix: 'BLF', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 34, name: 'Articulating Boom Lift', category: 'BOOM_LIFTS_ACCESS', defaultMake: 'Genie Z-45/25J RT 4WD', defaultCapacity: '51 ft (15.7m) Up & Over Reach', prefix: 'ABL', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 35, name: 'Telescopic Boom Lift', category: 'BOOM_LIFTS_ACCESS', defaultMake: 'JLG 860SJ Straight Mast', defaultCapacity: '86 ft (26.2m) Horizontal Reach', prefix: 'TBL', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 36, name: 'Scissor Lift', category: 'BOOM_LIFTS_ACCESS', defaultMake: 'Dingli JCPT 1612DC / Skyjack', defaultCapacity: '40 ft (12m) Electric 450 kg Deck', prefix: 'SCL', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 37, name: 'Spider Lift', category: 'BOOM_LIFTS_ACCESS', defaultMake: 'Falcon FS330Z Tracked Spider', defaultCapacity: '33 Meter Tracked Narrow Access', prefix: 'SPL', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 38, name: 'Manlift', category: 'BOOM_LIFTS_ACCESS', defaultMake: 'Haulotte Star 10 Vertical Mast', defaultCapacity: '10 Meter Aerial Personnel Basket', prefix: 'MNL', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },

  // 5. DG Sets and Power Equipment (39-59)
  { number: 39, name: 'DG Set – 7.5 kVA', category: 'DG_POWER', defaultMake: 'Kirloskar Silent / Mahindra', defaultCapacity: '7.5 kVA Single Phase', prefix: 'DG07', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 40, name: 'DG Set – 10 kVA', category: 'DG_POWER', defaultMake: 'Kirloskar Green / Honda', defaultCapacity: '10 kVA Diesel Silent', prefix: 'DG10', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 41, name: 'DG Set – 15 kVA', category: 'DG_POWER', defaultMake: 'Cummins India / Kirloskar', defaultCapacity: '15 kVA 3-Phase 415V', prefix: 'DG15', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 42, name: 'DG Set – 25 kVA', category: 'DG_POWER', defaultMake: 'Ashok Leyland / Cummins', defaultCapacity: '25 kVA 415V 50Hz', prefix: 'DG25', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 43, name: 'DG Set – 40 kVA', category: 'DG_POWER', defaultMake: 'Mahindra Powerol / Kirloskar', defaultCapacity: '40 kVA CPCB II Canopy', prefix: 'DG40', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 44, name: 'DG Set – 50 kVA', category: 'DG_POWER', defaultMake: 'Cummins B3.3 Series', defaultCapacity: '50 kVA Silent Acoustic', prefix: 'DG50', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 45, name: 'DG Set – 62.5 kVA', category: 'DG_POWER', defaultMake: 'Kirloskar KG62.5WS', defaultCapacity: '62.5 kVA Prime Duty', prefix: 'DG62', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 46, name: 'DG Set – 82.5 kVA', category: 'DG_POWER', defaultMake: 'Cummins 6BTA5.9G2', defaultCapacity: '82.5 kVA 415V 115A', prefix: 'DG82', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 47, name: 'DG Set – 100 kVA', category: 'DG_POWER', defaultMake: 'Kirloskar DV8 / Leyland', defaultCapacity: '100 kVA Soundproof Enclosure', prefix: 'DG100', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 48, name: 'DG Set – 125 kVA', category: 'DG_POWER', defaultMake: 'Cummins 6BTAA5.9G1', defaultCapacity: '125 kVA Plant Substation Power', prefix: 'DG125', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 49, name: 'DG Set – 160 kVA', category: 'DG_POWER', defaultMake: 'Cummins 6CTA8.3G2', defaultCapacity: '160 kVA Heavy Site Power', prefix: 'DG160', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 50, name: 'DG Set – 200 kVA', category: 'DG_POWER', defaultMake: 'Kirloskar 6SL9088TA', defaultCapacity: '200 kVA Concrete Plant Power', prefix: 'DG200', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 51, name: 'DG Set – 250 kVA', category: 'DG_POWER', defaultMake: 'Cummins QSL9-G5 Tier 3', defaultCapacity: '250 kVA RMC / HMP Backup', prefix: 'DG250', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 52, name: 'DG Set – 320 kVA', category: 'DG_POWER', defaultMake: 'Cummins NTA855G1B', defaultCapacity: '320 kVA Heavy Base Plant Power', prefix: 'DG320', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 53, name: 'DG Set – 380 kVA', category: 'DG_POWER', defaultMake: 'Caterpillar C13 / Perkins', defaultCapacity: '380 kVA Industrial Generator', prefix: 'DG380', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 54, name: 'DG Set – 400 kVA', category: 'DG_POWER', defaultMake: 'Cummins QSX15-G8 Electronic', defaultCapacity: '400 kVA Heavy Project Main Supply', prefix: 'DG400', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 55, name: 'DG Set – 500 kVA', category: 'DG_POWER', defaultMake: 'Cummins KTA19G9 Prime Power', defaultCapacity: '500 kVA Crusher & Asphalt Hub Power', prefix: 'DG500', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 56, name: 'Welding Generator', category: 'DG_POWER', defaultMake: 'Lincoln Electric Vantage 500', defaultCapacity: '500A Welder + 12 kW Aux Power', prefix: 'WGN', photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
  { number: 57, name: 'Air Compressor', category: 'DG_POWER', defaultMake: 'Atlas Copco XAS 186 / ELGi', defaultCapacity: '400 CFM / 100-150 PSI Diesel', prefix: 'CMP', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 58, name: 'Electrical Transformer', category: 'DG_POWER', defaultMake: 'Voltamp / Crompton Greaves', defaultCapacity: '11 kV to 415V / 500 kVA Oil Cooled', prefix: 'TRF', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 59, name: 'Portable Tower Light', category: 'DG_POWER', defaultMake: 'Doosan LSC 9M / Generac', defaultCapacity: '4x 1000W Metal Halide / 9m Mast', prefix: 'TLT', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },

  // 6. Main Construction Plants (60-67)
  { number: 60, name: 'RMC Plant', category: 'MAIN_PLANTS', defaultMake: 'Schwing Stetter M1.25 / CP30', defaultCapacity: '60 m³/h Twin Shaft Batching Plant', prefix: 'RMC', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 61, name: 'WMM Plant', category: 'MAIN_PLANTS', defaultMake: 'Apollo / Gujarat Apollo WMM 160', defaultCapacity: '160 to 200 TPH Wet Mix Pugmill', prefix: 'WMM', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 62, name: 'HMP / Hot Mix Plant', category: 'MAIN_PLANTS', defaultMake: 'Ammann Apollo ANP 1500 Drum', defaultCapacity: '120 to 160 TPH Asphalt Batching Plant', prefix: 'HMP', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 63, name: 'Stone Crusher Plant', category: 'MAIN_PLANTS', defaultMake: 'Metso Nordberg / Terex 200TPH', defaultCapacity: '200 TPH Jaw + Cone 3-Stage Plant', prefix: 'CRS', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 64, name: 'Concrete Batching Plant', category: 'MAIN_PLANTS', defaultMake: 'Macons Compact / Aquarius', defaultCapacity: '45 m³/h Planetary Pan Mixer', prefix: 'CBP', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 65, name: 'Chiller Plant', category: 'MAIN_PLANTS', defaultMake: 'Kirloskar Chillers / Blue Star', defaultCapacity: '100 TR Concrete Water Chiller', prefix: 'CHL', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 66, name: 'Concrete Block-Making Plant', category: 'MAIN_PLANTS', defaultMake: 'Columbia Machine / QGM Germany', defaultCapacity: '20,000 Paver Blocks / Shift', prefix: 'BLK', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 67, name: 'Soil Stabilization Plant', category: 'MAIN_PLANTS', defaultMake: 'Wirtgen KMA 220i Mobile', defaultCapacity: '220 TPH Cold Recycling Plant', prefix: 'STB', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },

  // 7. Concrete and Road Construction Equipment (68-80)
  { number: 68, name: 'Concrete Mixer Machine', category: 'CONCRETE_ROAD', defaultMake: 'Universal 10/7 Hydraulic Hopper', defaultCapacity: '1 Bag / 200 Ltr Drum', prefix: 'CMX', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 69, name: 'Concrete Pump – Stationary', category: 'CONCRETE_ROAD', defaultMake: 'Schwing Stetter BP 350 / Putzmeister', defaultCapacity: '50 m³/h High Rise Pumping', prefix: 'SCP', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 70, name: 'Concrete Vibrator', category: 'CONCRETE_ROAD', defaultMake: 'Jaypee 5 HP Honda Needle Needle', defaultCapacity: '40mm / 60mm Needle 12,000 VPM', prefix: 'VIB', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 71, name: 'Concrete Cutter', category: 'CONCRETE_ROAD', defaultMake: 'Husqvarna FS 400 LV / Norton', defaultCapacity: '18 Inch Diamond Blade / 165mm Depth', prefix: 'CUT', photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
  { number: 72, name: 'Concrete Road Paver', category: 'CONCRETE_ROAD', defaultMake: 'Gomaco GP 2400 / Wirtgen SP 64', defaultCapacity: '7.5m PQC Slipform Paver', prefix: 'PQC', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 73, name: 'Asphalt Paver Finisher', category: 'CONCRETE_ROAD', defaultMake: 'Vögele Super 1800-3 / Apollo', defaultCapacity: '9.0 Meter Screed / 700 TPH', prefix: 'APF', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 74, name: 'Road Milling Machine', category: 'CONCRETE_ROAD', defaultMake: 'Wirtgen W 2000 Cold Planer', defaultCapacity: '2.0 Meter Milling Width / 320mm Depth', prefix: 'MIL', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 75, name: 'Bitumen Sprayer', category: 'CONCRETE_ROAD', defaultMake: 'Atlas SBS-400 Trolley Sprayer', defaultCapacity: '400 Litres Hand Lances Bar', prefix: 'BSP', photoUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80' },
  { number: 76, name: 'Bitumen Pressure Distributor', category: 'CONCRETE_ROAD', defaultMake: 'Tiki Tar / Speedcrafts 6000L', defaultCapacity: '6,000 Litres Truck Mounted Sprayer', prefix: 'BPD', photoUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80' },
  { number: 77, name: 'Road Sweeper', category: 'CONCRETE_ROAD', defaultMake: 'Dulevo 5000 / Roots Multiclean', defaultCapacity: '5 m³ Hopper Vacuum Road Sweeper', prefix: 'SWP', photoUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80' },
  { number: 78, name: 'Road Broomer', category: 'CONCRETE_ROAD', defaultMake: 'Tractor Mounted Hydraulic Broomer', defaultCapacity: '2.1 Meter Steel Wire / Nylon Roller', prefix: 'BRM', photoUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80' },
  { number: 79, name: 'Grout Mixer and Pump', category: 'CONCRETE_ROAD', defaultMake: 'Putzknecht S48 / ChemGrout', defaultCapacity: '40 Ltr/min / 40 Bar Pressure', prefix: 'GRT', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 80, name: 'Hydraulic Power Pack', category: 'CONCRETE_ROAD', defaultMake: 'Atlas Copco LP 9-20 E / JCB', defaultCapacity: '20 L/min @ 140 Bar Dual Circuit', prefix: 'HPP', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },

  // 8. Workshop and Fabrication Machinery (81-90)
  { number: 81, name: 'Arc Welding Machine', category: 'WORKSHOP_FABRICATION', defaultMake: 'ESAB Arc 400i / Ador Welding', defaultCapacity: '400 Amp Inverter Duty', prefix: 'ARC', photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
  { number: 82, name: 'MIG Welding Machine', category: 'WORKSHOP_FABRICATION', defaultMake: 'Kemppi FastMig / Miller 350P', defaultCapacity: '350 Amp CO2 / Argon Shielded', prefix: 'MIG', photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
  { number: 83, name: 'TIG Welding Machine', category: 'WORKSHOP_FABRICATION', defaultMake: 'Fronius MagicWave 250A', defaultCapacity: '250 Amp AC/DC Precision TIG', prefix: 'TIG', photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
  { number: 84, name: 'Welding Rod Oven', category: 'WORKSHOP_FABRICATION', defaultMake: 'Ador Holding Oven 50kg', defaultCapacity: '50 kg Capacity / 350°C Thermostat', prefix: 'OVN', photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
  { number: 85, name: 'Band Saw Machine', category: 'WORKSHOP_FABRICATION', defaultMake: 'Kalamazoo Metal Semi-Auto 300', defaultCapacity: '300mm Round Bar Cutting', prefix: 'BSW', photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
  { number: 86, name: 'Chop Saw – 14 Inch', category: 'WORKSHOP_FABRICATION', defaultMake: 'DeWalt D28730 / Bosch GCO 14', defaultCapacity: '14 Inch Abrasive Cut-off / 2400W', prefix: 'CSW', photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
  { number: 87, name: 'Angle Grinder', category: 'WORKSHOP_FABRICATION', defaultMake: 'Bosch GWS 2200 / Makita 7 Inch', defaultCapacity: '7 Inch / 9 Inch Heavy Duty 2200W', prefix: 'AGR', photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
  { number: 88, name: 'Hydraulic Press', category: 'WORKSHOP_FABRICATION', defaultMake: 'Hydrolock Workshop 100 Ton', defaultCapacity: '100 Ton Bush & Bearing Press', prefix: 'HPR', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 89, name: 'Hydraulic Hose Crimping Machine', category: 'WORKSHOP_FABRICATION', defaultMake: 'Finn-Power P20 / Gates SC32', defaultCapacity: 'Up to 2 Inch 4SP/6SP Hose Crimping', prefix: 'CRM', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 90, name: 'Engine Lifting Crane', category: 'WORKSHOP_FABRICATION', defaultMake: 'Torin BigRed 3 Ton Workshop Crane', defaultCapacity: '3 Ton Hydraulic Foldable Floor Crane', prefix: 'ELC', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },

  // 9. Pumps and Utility Equipment (91-98)
  { number: 91, name: 'Diesel Water Pump', category: 'PUMPS_UTILITY', defaultMake: 'Kirloskar 4 Inch High Discharge', defaultCapacity: '10 HP / 1500 LPM @ 20m Head', prefix: 'DWP', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 92, name: 'Electric Water Pump', category: 'PUMPS_UTILITY', defaultMake: 'Crompton 7.5 HP Monoblock', defaultCapacity: '7.5 HP 3-Phase 1000 LPM', prefix: 'EWP', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 93, name: 'Submersible Pump', category: 'PUMPS_UTILITY', defaultMake: 'CRI 10 HP Borewell Submersible', defaultCapacity: '10 HP 15-Stage Deep Head', prefix: 'SMP', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 94, name: 'Dewatering Pump', category: 'PUMPS_UTILITY', defaultMake: 'Flygt BS 2125 / Tsurumi 6 Inch', defaultCapacity: '15 kW Solids Handling Dewatering', prefix: 'DWP', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 95, name: 'Slurry Pump', category: 'PUMPS_UTILITY', defaultMake: 'Warman 4/3 Slurry Pump', defaultCapacity: '25 HP Heavy Bentonite / Pier Mud', prefix: 'SLP', photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { number: 96, name: 'Pressure Washer', category: 'PUMPS_UTILITY', defaultMake: 'Kärcher HD 9/20-4 Classic', defaultCapacity: '250 Bar High Pressure Jet Washer', prefix: 'PWR', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 97, name: 'Grease Pump', category: 'PUMPS_UTILITY', defaultMake: 'Groz 50:1 Air Operated Bucket', defaultCapacity: '30 kg Pneumatic Central Greaser', prefix: 'GRP', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 98, name: 'Diesel Transfer Pump', category: 'PUMPS_UTILITY', defaultMake: 'Piusi Panther 72 DC/AC Kit', defaultCapacity: '70 LPM Dispenser + Auto Nozzle', prefix: 'DTP', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },

  // 10. Material and Reinforcement Equipment (99-105)
  { number: 99, name: 'Bar Bending Machine', category: 'MATERIAL_REINFORCEMENT', defaultMake: 'Spartan GW42J / Jaypee', defaultCapacity: 'Up to 42mm TMT Rebar Bending', prefix: 'BBM', photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
  { number: 100, name: 'Bar Cutting Machine', category: 'MATERIAL_REINFORCEMENT', defaultMake: 'Jaypee GQ40 / Spartan', defaultCapacity: 'Up to 40mm TMT High Tensile Shearing', prefix: 'BCM', photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
  { number: 101, name: 'Rebar Threading Machine', category: 'MATERIAL_REINFORCEMENT', defaultMake: 'Dextra HGS 40 Coupler Threader', defaultCapacity: '16mm to 40mm Rebar Cold Forging', prefix: 'RTM', photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
  { number: 102, name: 'Prestressing Jack', category: 'MATERIAL_REINFORCEMENT', defaultMake: 'Freyssinet / Usha YJM Mono/Multi', defaultCapacity: '350 Ton Post-Tensioning Jack', prefix: 'PSJ', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 103, name: 'Electric Grout Pump', category: 'MATERIAL_REINFORCEMENT', defaultMake: 'Colcrete Euro Grout Continuous', defaultCapacity: '100 Litres Colloidal High Shear', prefix: 'EGP', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
  { number: 104, name: 'Cement Silo', category: 'MATERIAL_REINFORCEMENT', defaultMake: 'Schwing Stetter 100T Bolted Silo', defaultCapacity: '100 Ton Vertical Storage + Safety Valve', prefix: 'SIL', photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
  { number: 105, name: 'Screw Conveyor', category: 'MATERIAL_REINFORCEMENT', defaultMake: 'WAM ES 273 Heavy Cement Feeder', defaultCapacity: '273mm Dia x 9m Screw Feeder', prefix: 'SCV', photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80' },
];

/**
 * Generate the Initial 105 Pre-Registered Fleet Machines for VRC Construction India Ltd
 */
export const INITIAL_MACHINES: Machine[] = PM_MASTER_CATALOG.map((item, idx) => {
  const paddedNo = String(item.number).padStart(3, '0');
  const regNo = `VRC-${item.prefix}-${paddedNo}`;

  // Realistic operational status distribution for construction yard:
  let status: Machine['status'] = 'WORKING';
  if (idx === 0) status = 'BREAKDOWN'; // Item 1 (Excavator) breakdown example
  else if (idx === 6 || idx === 11 || idx === 47) status = 'UNDER_MAINTENANCE';
  else if (idx % 4 === 1) status = 'PENDING';

  return {
    id: `m-pm-${paddedNo}`,
    masterNumber: item.number,
    name: item.name,
    identificationNumber: regNo,
    category: item.category,
    modelMake: item.defaultMake,
    capacityRating: item.defaultCapacity,
    siteProjectName: idx < 30 ? 'VRC Highway Expressway Project (Pkg-4)' : idx < 65 ? 'VRC Flyover Pier-14 Site Yard' : 'VRC Central P&M Workshop & Casting Yard',
    driverOperatorName: idx % 2 === 0 ? 'Rameshwar Yadav' : 'Mukesh Sharma',
    mechanicName: 'Satish Sharma (P&M Engineer)',
    currentHoursOdometer: 1200 + idx * 85,
    fuelOilStatus: 'Engine Oil: OK • Coolant: Normal • Fuel: 80% • Hydraulic: Good',
    status,
    lastInspectionDate: new Date(Date.now() - (idx % 3) * 86400000).toISOString(),
    photoUrl: item.photoUrl,
    qrCodeValue: `VRC-PM-${paddedNo}`,
    maintenanceHistory: [
      {
        id: `srv-${item.number}-01`,
        serviceType: '500_HRS',
        serviceDate: new Date(Date.now() - 15 * 86400000).toISOString(),
        hourMeterOrKm: 1100 + idx * 80,
        performedBy: 'Satish Sharma',
        oilFilterChanged: true,
        fuelFilterChanged: true,
        hydraulicOilChecked: true,
        greasingDone: true,
        remarks: 'General 500-hour preventive maintenance completed. Filter elements replaced.',
      },
    ],
    breakdownHistory: idx === 0 ? [
      {
        id: `brk-${item.number}-01`,
        date: new Date().toISOString(),
        issue: 'Main boom hoist cylinder high-pressure hose leaking oil near crimp coupling.',
        rootCause: 'Vibration fatigue on hydraulic hose crimp sleeve.',
        actionTaken: 'Machine tagged out. Requisition raised for OEM spiral hose.',
        mechanicName: 'Satish Sharma',
        downtimeHours: 4.5,
        status: 'AWAITING_PARTS',
      },
    ] : [],
    sparePartsHistory: [
      {
        id: `sp-${item.number}-01`,
        partName: 'Primary Fuel Filter & Lube Filter Element',
        partNumber: 'VRC-FLT-882',
        quantity: 1,
        dateReplaced: new Date(Date.now() - 30 * 86400000).toISOString(),
        mechanicName: 'Satish Sharma',
        remarks: 'Routine scheduled replacement at yard service bay.',
      },
    ],
  };
});

/**
 * 20 Standard Pre-Shift Inspection Items (Simple English + OSHA/ISO aligned)
 * Never mark as OK automatically!
 */
export const DEFAULT_CHECKLIST_ITEMS: ChecklistItem[] = [
  // 1. Engine Oil
  {
    id: 'chk-engine-oil',
    label: 'Engine Oil Level & Leakage',
    description: 'Check dipstick oil level between MIN and MAX. Verify no oil dripping from engine sump or gaskets.',
    isCritical: true,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'DG_POWER', 'CONCRETE_ROAD', 'PUMPS_UTILITY', 'VEHICLES_TIPPERS', 'JCB_BACKHOE', 'LOADERS_EXCAVATORS', 'HYDRA_CRANES', 'COMPACTORS_ROLLERS', 'DG_SETS', 'PUMPS_OTHER'],
  },
  // 2. Coolant & Radiator
  {
    id: 'chk-coolant-radiator',
    label: 'Coolant Level & Radiator Leakage',
    description: 'Inspect coolant overflow bottle level. Check radiator fins for choking, mud, and water hose leaks.',
    isCritical: true,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'DG_POWER', 'CONCRETE_ROAD', 'PUMPS_UTILITY', 'VEHICLES_TIPPERS', 'JCB_BACKHOE', 'LOADERS_EXCAVATORS', 'HYDRA_CRANES', 'COMPACTORS_ROLLERS', 'DG_SETS', 'PUMPS_OTHER'],
  },
  // 3. Fuel & Tank Leakage
  {
    id: 'chk-fuel-leakage',
    label: 'Fuel Level & Fuel Line Leakage',
    description: 'Check diesel fuel gauge. Inspect fuel sedimenter bowl, pump, water separator, and tank cap lock.',
    isCritical: true,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'DG_POWER', 'MAIN_PLANTS', 'CONCRETE_ROAD', 'PUMPS_UTILITY', 'VEHICLES_TIPPERS', 'JCB_BACKHOE', 'LOADERS_EXCAVATORS', 'HYDRA_CRANES', 'COMPACTORS_ROLLERS', 'DG_SETS', 'PUMPS_OTHER'],
  },
  // 4. Battery & Cables
  {
    id: 'chk-battery-condition',
    label: 'Battery Condition & Terminals',
    description: 'Check battery terminal clamps tightness, acid leakage, electrolyte level, and main battery cutoff switch.',
    isCritical: true,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'DG_POWER', 'MAIN_PLANTS', 'CONCRETE_ROAD', 'PUMPS_UTILITY', 'VEHICLES_TIPPERS', 'JCB_BACKHOE', 'LOADERS_EXCAVATORS', 'HYDRA_CRANES', 'COMPACTORS_ROLLERS', 'DG_SETS', 'PUMPS_OTHER'],
  },
  // 5. Brakes & Parking Brake
  {
    id: 'chk-brakes-parking',
    label: 'Brakes & Parking Brake',
    description: 'Test foot brake pedal firmness, air reservoir pressure build-up, and mechanical handbrake lock hold.',
    isCritical: true,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'CONCRETE_ROAD', 'VEHICLES_TIPPERS', 'JCB_BACKHOE', 'LOADERS_EXCAVATORS', 'HYDRA_CRANES', 'COMPACTORS_ROLLERS'],
  },
  // 6. Tyres / Tracks & Wheel Nuts
  {
    id: 'chk-tyres-tracks-nuts',
    label: 'Tyres / Tracks & Wheel Nuts Tightness',
    description: 'Inspect tyre inflation pressure, deep sidewall cuts, track pad tension, and check for loose wheel studs.',
    isCritical: true,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'CONCRETE_ROAD', 'VEHICLES_TIPPERS', 'JCB_BACKHOE', 'LOADERS_EXCAVATORS', 'HYDRA_CRANES', 'COMPACTORS_ROLLERS'],
  },
  // 7. Lights, Horn & Reverse Alarm
  {
    id: 'chk-lights-indicators-horn',
    label: 'Lights, Indicators, Horn & Reverse Alarm',
    description: 'Test headlights, turn signals, hazard lights, brake lights, front horn, and audible reverse backup beeper.',
    isCritical: true,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'CONCRETE_ROAD', 'VEHICLES_TIPPERS', 'JCB_BACKHOE', 'LOADERS_EXCAVATORS', 'HYDRA_CRANES', 'COMPACTORS_ROLLERS'],
  },
  // 8. Hydraulic Oil & Leakage
  {
    id: 'chk-hydraulic-oil-leakage',
    label: 'Hydraulic Oil Level & Cylinder / Hose Leakage',
    description: 'Verify oil level in sight glass. Inspect lift rams, boom cylinders, high-pressure hoses for weeping oil.',
    isCritical: true,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'MAIN_PLANTS', 'CONCRETE_ROAD', 'WORKSHOP_FABRICATION', 'MATERIAL_REINFORCEMENT', 'LOADERS_EXCAVATORS', 'JCB_BACKHOE', 'HYDRA_CRANES', 'HMP_PLANTS', 'RMC_PLANTS', 'WMM_PLANTS'],
  },
  // 9. Belts, Hoses & Pipes
  {
    id: 'chk-belts-hoses-pipes',
    label: 'Belts, Hoses & Rubber Pipes',
    description: 'Inspect alternator fan belt tension, air cleaner hose clamps, radiator hoses for cracks and wear.',
    isCritical: false,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'DG_POWER', 'MAIN_PLANTS', 'CONCRETE_ROAD', 'PUMPS_UTILITY', 'VEHICLES_TIPPERS', 'JCB_BACKHOE', 'LOADERS_EXCAVATORS', 'DG_SETS'],
  },
  // 10. Steering & Controls
  {
    id: 'chk-steering-controls',
    label: 'Steering Condition & Joystick Controls',
    description: 'Verify smooth steering response without excessive free play. Check joystick lock / safety lever operation.',
    isCritical: true,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'VEHICLES_TIPPERS', 'JCB_BACKHOE', 'LOADERS_EXCAVATORS', 'HYDRA_CRANES'],
  },
  // 11. Engine Noise & Vibration
  {
    id: 'chk-engine-noise-vibration',
    label: 'Engine Noise, Vibration & Exhaust Smoke',
    description: 'Listen for knocking or tapping sounds. Check turbocharger whistle and heavy black or white exhaust smoke.',
    isCritical: false,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'DG_POWER', 'CONCRETE_ROAD', 'PUMPS_UTILITY', 'VEHICLES_TIPPERS', 'JCB_BACKHOE', 'DG_SETS'],
  },
  // 12. Electrical Wiring & Control Panel
  {
    id: 'chk-electrical-wiring',
    label: 'Electrical Wiring, Switches & Gauges',
    description: 'Inspect dashboard instruments, hour meter, temperature gauge, alternator charging light, and wire insulation.',
    isCritical: true,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'DG_POWER', 'MAIN_PLANTS', 'CONCRETE_ROAD', 'WORKSHOP_FABRICATION', 'MATERIAL_REINFORCEMENT', 'DG_SETS', 'HMP_PLANTS', 'RMC_PLANTS', 'WMM_PLANTS'],
  },
  // 13. Safety Guards & Emergency Stop Button
  {
    id: 'chk-safety-guards-estop',
    label: 'Safety Guards, Covers & Emergency Stop',
    description: 'Ensure rotating belts and couplings have sheet metal guards. Test mushroom EMERGENCY STOP button trip.',
    isCritical: true,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'DG_POWER', 'MAIN_PLANTS', 'CONCRETE_ROAD', 'WORKSHOP_FABRICATION', 'PUMPS_UTILITY', 'MATERIAL_REINFORCEMENT', 'HMP_PLANTS', 'RMC_PLANTS', 'WMM_PLANTS', 'DG_SETS'],
  },
  // 14. Fire Extinguisher & First-Aid Kit
  {
    id: 'chk-fire-extinguisher',
    label: 'Fire Extinguisher & First-Aid Kit',
    description: 'Verify ABC dry chemical fire extinguisher pressure needle is in green zone. First aid kit present on machine.',
    isCritical: true,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'DG_POWER', 'MAIN_PLANTS', 'CONCRETE_ROAD', 'WORKSHOP_FABRICATION', 'MATERIAL_REINFORCEMENT', 'VEHICLES_TIPPERS', 'JCB_BACKHOE', 'LOADERS_EXCAVATORS', 'HYDRA_CRANES', 'DG_SETS', 'HMP_PLANTS', 'RMC_PLANTS'],
  },
  // 15. Cleaning & General Machine Condition
  {
    id: 'chk-cleaning-condition',
    label: 'Cabin Cleanliness, Glass & General Condition',
    description: 'Ensure windshield glass, rear view mirrors are clean. Check cabin floor clear of grease and loose tools.',
    isCritical: false,
    categories: ['EARTHMOVING', 'VEHICLES_TRANSPORT', 'LIFTING_HANDLING', 'BOOM_LIFTS_ACCESS', 'DG_POWER', 'MAIN_PLANTS', 'CONCRETE_ROAD', 'WORKSHOP_FABRICATION', 'PUMPS_UTILITY', 'MATERIAL_REINFORCEMENT', 'VEHICLES_TIPPERS', 'JCB_BACKHOE'],
  },

  // 16. Plant Specific: Cold / Aggregate Bins & Feeders
  {
    id: 'chk-plant-feeders',
    label: 'Plant Aggregate Bins, Feeders & Gates',
    description: 'Check bin grizzly screens, bin walls, vibratory motors, flow sensor gates, and variable speed feeder belts.',
    isCritical: true,
    categories: ['MAIN_PLANTS', 'HMP_PLANTS', 'RMC_PLANTS', 'WMM_PLANTS'],
  },
  // 17. Plant Specific: Conveyors, Belts, Rollers & Bearings
  {
    id: 'chk-plant-conveyors-rollers',
    label: 'Plant Conveyors, Idler Rollers & Belt Tension',
    description: 'Inspect conveyor belt alignment, carry and return idlers, take-up gravity tensioner, and bearing greasing.',
    isCritical: true,
    categories: ['MAIN_PLANTS', 'HMP_PLANTS', 'RMC_PLANTS', 'WMM_PLANTS'],
  },
  // 18. Plant Specific: Dryer, Burner & Bitumen Pumps (HMP Plant)
  {
    id: 'chk-plant-dryer-burner',
    label: 'Dryer Drum, Bitumen Pumps & Burner Ignition',
    description: 'Inspect dryer drum trunnion rollers, drive chain, diesel/LDO burner nozzle, jacketed bitumen pump lines.',
    isCritical: true,
    categories: ['MAIN_PLANTS', 'HMP_PLANTS'],
  },
  // 19. Plant Specific: Mixer, Pugmill, Weigh Batcher & Blades (RMC & WMM)
  {
    id: 'chk-plant-mixer-blades',
    label: 'Mixer Pan / Pugmill, Mixing Arms, Wear Plates & Blades',
    description: 'Inspect twin-shaft mixing blades clearance, liner tile wear, discharge pneumatic door seal and gearbox oil.',
    isCritical: true,
    categories: ['MAIN_PLANTS', 'RMC_PLANTS', 'WMM_PLANTS'],
  },
  // 20. Plant Specific: Air Compressor & Pneumatic System
  {
    id: 'chk-plant-compressor-pneumatics',
    label: 'Plant Air Compressor, Solenoid Valves & FRL Unit',
    description: 'Check air receiver safety relief valve, moisture drain cock, FRL oiler level, and gate cylinder stroke.',
    isCritical: true,
    categories: ['MAIN_PLANTS', 'HMP_PLANTS', 'RMC_PLANTS', 'WMM_PLANTS', 'DG_POWER'],
  },
];

export interface SampleDefectPhoto {
  title: string;
  subsystem: string;
  url: string;
}

export const SAMPLE_DEFECT_PHOTOS: SampleDefectPhoto[] = [
  {
    title: 'Hydraulic Hose Oil Leakage',
    subsystem: 'Hydraulic System',
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Tyre Deep Cut & Tread Wear',
    subsystem: 'Under-carriage / Tyres',
    url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Engine Radiator Fin Damage',
    subsystem: 'Cooling & Engine',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Loose Wheel Nut & Stud Play',
    subsystem: 'Brakes & Running Gear',
    url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Battery Acid Leak & Loose Terminal',
    subsystem: 'Electrical System',
    url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Conveyor Belt Misalignment & Tear',
    subsystem: 'Plant Conveyors',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80',
  },
];
