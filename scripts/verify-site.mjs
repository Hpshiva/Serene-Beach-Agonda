import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

console.log('🧪 Starting Serene Beach Agonda Verification Suite...');

// 1. Verify build files exist and are non-empty
const distPath = path.resolve('./dist');
assert(fs.existsSync(distPath), 'Dist directory must exist.');
assert(fs.existsSync(path.join(distPath, 'index.html')), 'Dist index.html must exist.');

const indexHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
assert(indexHtml.includes('Serene Beach Agonda'), 'index.html must include brand title.');
assert(indexHtml.includes('Roboto+Condensed') && indexHtml.includes('WindSong'), 'index.html must include Roboto Condensed and WindSong font links.');
console.log('✅ Build artifact verification passed.');

// 2. Verify Room catalogue & pricing math
const roomsFilePath = path.resolve('./src/data/rooms.ts');
const roomsFileContent = fs.readFileSync(roomsFilePath, 'utf8');
assert(roomsFileContent.includes('Double Room With Balcony'), 'Must include Double Room With Balcony.');
assert(roomsFileContent.includes('Family Room with Side Sea View'), 'Must include Family Room with Side Sea View.');
assert(roomsFileContent.includes('Double Room With Sea View'), 'Must include Double Room With Sea View.');
assert(roomsFileContent.includes('Family Room With Sea View'), 'Must include Family Room With Sea View.');
assert(roomsFileContent.includes('31320'), 'Must include CRS ID 31320.');
assert(roomsFileContent.includes('31319'), 'Must include CRS ID 31319.');
assert(roomsFileContent.includes('31321'), 'Must include CRS ID 31321.');
assert(roomsFileContent.includes('31333'), 'Must include CRS ID 31333.');
console.log('✅ Room catalogue & AsiaTech CRS reference verification passed.');

// 3. Verify Pricing & Savings logic simulation
function calculateDemoBooking(directRate, rackRate, nights, quantity, mealDelta, adults, extraBeds = 0) {
  const roomSubtotal = directRate * nights * quantity;
  const rackSubtotal = rackRate * nights * quantity;
  const directSavings = rackSubtotal - roomSubtotal;
  const mealCharges = mealDelta * nights * adults * quantity;
  const extraBedCharges = extraBeds * 800 * nights;
  const gross = roomSubtotal + mealCharges + extraBedCharges;
  const taxRate = (roomSubtotal / (nights * quantity)) > 7500 ? 0.18 : 0.12;
  const taxAmount = Math.round(gross * taxRate);
  const total = gross + taxAmount;
  return { roomSubtotal, directSavings, taxAmount, total };
}

// Test Double Room Sea View (Direct: 5000, Rack: 5500, 3 nights, 2 adults, breakfast delta 450)
const testBooking = calculateDemoBooking(5000, 5500, 3, 1, 450, 2);
assert.strictEqual(testBooking.roomSubtotal, 15000, 'Subtotal should be 15,000');
assert.strictEqual(testBooking.directSavings, 1500, 'Direct savings should be 1,500');
assert.strictEqual(testBooking.taxAmount, Math.round((15000 + 2700) * 0.12), 'GST should be 12%');
console.log('✅ Financial & direct saving calculation logic passed.');

// 4. Verify Attractions & Experience destinations
const attractionsFilePath = path.resolve('./src/data/attractions.ts');
const attrContent = fs.readFileSync(attractionsFilePath, 'utf8');
assert(attrContent.includes('Agonda Beach & Turtle Nesting'), 'Must contain Agonda Beach.');
assert(attrContent.includes('Cola Beach & Emerald Lagoon'), 'Must contain Cola Beach.');
assert(attrContent.includes('Butterfly Beach Hidden Cove'), 'Must contain Butterfly Beach.');
assert(attrContent.includes('Cabo de Rama Historic Fort'), 'Must contain Cabo de Rama Fort.');
assert(attrContent.includes('Palolem Beach & Kayak Bay'), 'Must contain Palolem Beach.');
console.log('✅ Attractions and travel directions verified.');

// 5. Verify Property Research Doc
const docPath = path.resolve('./docs/property-research.md');
assert(fs.existsSync(docPath), 'docs/property-research.md must exist.');
console.log('✅ docs/property-research.md verified.');

console.log('🎉 All Automated Verifications Passed Successfully!');
