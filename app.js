import { db } from "./firebase-config.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const form = document.getElementById("bookingForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const phone = form.phone.value.trim();
  const time = form.time.value;

  // 1. Өмнө цаг захиалсан эсэхийг шалгах
  const q = query(collection(db, "bookings"), where("phone", "==", phone));
  const snapshot = await getDocs(q);
  let hasConflict = false;

  snapshot.forEach(doc => {
    const existing = doc.data();
    if (existing.time === time) hasConflict = true;
  });

  if (hasConflict) {
    status.textContent = "⚠ Энэ утсаар энэ цагт өмнө захиалсан байна.";
    return;
  }

  // 2. Хадгалах
  await addDoc(collection(db, "bookings"), {
    phone,
    time,
    createdAt: new Date().toISOString(),
  });

  status.textContent = "✅ Амжилттай цаг захиаллаа!";
  form.reset();
});
