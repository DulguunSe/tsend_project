

// date

const dateInputMonth = document.getElementById('date');
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth()+1).padStart(2,'0'); // тухайн сар
  const lastDay = new Date(year, now.getMonth()+1, 0).getDate(); // тухайн сарын сүүлийн өдөр

  dateInputMonth.min = `${year}-${month}-01`;
  dateInputMonth.max = `${year}-${month}-${lastDay}`;



document.getElementById('year').textContent = new Date().getFullYear();

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  hamburger.addEventListener('click', ()=>{
    mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
  });

  // Available slots logic
  const quickTimes = document.getElementById('quick-times');
  const dateInput = document.getElementById('date');

  function renderSlots(day){
    quickTimes.innerHTML = '';
    let slots = [];
    if(day===2){ // Tuesday
      slots = ["10:00","11:20"];
    } else if(day===3 || day===5){ // Wednesday or Friday
      slots = ["09:00","10:10","11:20","14:00"];
    }
    slots.forEach(t=>{
      const div=document.createElement('div');
      div.className='time-slot';
      div.textContent=t;
      div.onclick=()=>{
        document.querySelectorAll('.time-slot').forEach(x=>x.classList.remove('active'));
        div.classList.add('active');
      };
      quickTimes.appendChild(div);
    });
  }

  // Огноо зөвхөн 2,3,5 сонгоно
  dateInput.addEventListener('input', ()=>{
    const d=new Date(dateInput.value);
    const day=d.getDay();
    if (![2,3,5].includes(day)){
      dateInput.setCustomValidity("Зөвхөн мягмар, лхагва, баасан гарагийг сонгоно уу.");
      dateInput.reportValidity();
      quickTimes.innerHTML='';
    } else {
      dateInput.setCustomValidity("");
      renderSlots(day);
    }
  });

  // Booking
  const bookBtn = document.getElementById('bookBtn');
  bookBtn.addEventListener('click', ()=>{
    const name=document.getElementById('name').value.trim();
    // const email=document.getElementById('email').value.trim();
    const date=document.getElementById('date').value;
    const selected=document.querySelector('.time-slot.active');
    // const msg=document.getElementById('bookMsg');
    if(!name||!email||!date||!selected){
      msg.style.color='#b91c1c';
      msg.textContent='Бүх талбаруудыг бөглөнө үү.';
      return;
    }
    msg.style.color='#065f46';
    msg.textContent=`Захиалга амжилттай: ${date} ${selected.textContent}`;
  });