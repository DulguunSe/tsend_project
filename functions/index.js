const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");

admin.initializeApp();

// 🔐 Twilio credentials (энэ хэсгийг өөрийнхөөрөө солиорой)
const accountSid = "AC40266c91762a803799d78da36e2b63a1";
const authToken = "3651a999b867aeef6046edd7024eaabd";
const client = twilio(accountSid, authToken);

// Firestore-д шинэ захиалга үүсэхэд SMS илгээнэ
exports.sendBookingSMS = functions.firestore
  .document("bookings/{bookingId}")
  .onCreate(async (snap) => {
    const booking = snap.data();
    const message = `Сайн байна уу, ${booking.name || "хэрэглэгч"}! 
Таны цаг амжилттай захиалагдлаа:
📅 ${booking.date} ⏰ ${booking.time}.
Баярлалаа!`;

    try {
      await client.messages.create({
        body: message,
        from: "+18777804236", // Twilio утасны дугаар
        to: `+976${booking.phone}`, // хэрэглэгчийн утас
      });
      console.log("✅ SMS илгээгдлээ:", booking.phone);
    } catch (error) {
      console.error("❌ SMS илгээхэд алдаа:", error);
    }
  });
