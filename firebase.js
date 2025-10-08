
    import  initializeApp  from "firebase/app";
    import { getFirestore } from "firebase/firestore";



    const app = initializeApp(firebaseConfig);





    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar toggle
    document.getElementById('hamburger').addEventListener('click', () => {
      const mobileNav = document.getElementById('mobileNav');
      mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
    });

    // Swiper
    const swiper = new Swiper(".swiper", {
      slidesPerView: 1.2,
      spaceBetween: 12,
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: { 640: { slidesPerView: 1.5 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2.5 } }
    });

    // Firebase Config (👉 ЭНД өөрийн Firebase мэдээллийг тавина)
    const firebaseConfig = {
      apiKey: "AIzaSyC2-x9AYrAuUtN3lwSYhV-f-003cTvdP6M",
      authDomain: "indrasetgelzui.firebaseapp.com",
      databaseURL: "https://indrasetgelzui-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "indrasetgelzui",
      storageBucket: "indrasetgelzui.firebasestorage.app",
      messagingSenderId: "546192791621",
      appId: "1:546192791621:web:5485a7ca0ffd6034346b2c",
      measurementId: "G-LRJ7F0V4DT"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Цагийн сонголт
    const quickTimes = document.getElementById('quick-times');
    document.getElementById('date').addEventListener('input', e => {
      const d = new Date(e.target.value);
      const day = d.getDay();
      let slots = [];
      if (day === 2) slots = ["10:00", "11:20"];
      else if (day === 3 || day === 5) slots = ["09:00", "10:10", "11:20", "14:00"];
      quickTimes.innerHTML = '';
      slots.forEach(t => {
        const div = document.createElement('div');
        div.className = 'time-slot';
        div.textContent = t;
        div.onclick = () => {
          document.querySelectorAll('.time-slot').forEach(x => x.classList.remove('active'));
          div.classList.add('active');
        };
        quickTimes.appendChild(div);
      });
    });

    // Цаг товлох
    document.getElementById('bookBtn').addEventListener('click', async () => {
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('email').value.trim();
      const date = document.getElementById('date').value;
      const grade = document.getElementById('type').value;
      const group = document.getElementById('buleg').value.trim();
      const issue = document.getElementById('type-1').value;
      const selected = document.querySelector('.time-slot.active');
      const msg = document.getElementById('bookMsg');
      console.log(name)

      if (!name || !phone || !date || !selected) {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Бүх талбаруудыг бөглөнө үү.';
        return;
      }

      try {
        await db.collection('bookings').add({
          name, phone, grade, group, issue, date,
          time: selected.textContent,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        msg.style.color = '#065f46';
        msg.textContent = `Амжилттай илгээгдлээ: ${date} ${selected.textContent}`;
      } catch (err) {
        console.error(err);
        msg.style.color = '#b91c1c';
        msg.textContent = 'Алдаа гарлаа. Та дахин оролдоно уу.';
      }
    });