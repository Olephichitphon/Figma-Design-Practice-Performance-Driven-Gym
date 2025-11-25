function toggleHam(x) {
  x.classList.toggle("change");

  let myMenu = document.getElementById("myMenu");
  if (myMenu.className === "nav-wrapper") {
    myMenu.className += " menu-active";
}else{
    myMenu.className = "nav-wrapper";
}
}

// ----------------------------------------------------
// 3. JavaScript: ใช้ Intersection Observer ตรวจจับการ Scroll
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    
    // กำหนดตัวเลือกสำหรับ Observer
    const observerOptions = {
        root: null, // ตรวจจับกับ Viewport (หน้าจอผู้ใช้)
        rootMargin: '0px',
        threshold: 0.1 // เมื่อ Element เข้ามาในหน้าจอ 10% ให้เริ่มทำงาน
    };

    // Function ที่จะถูกเรียกเมื่อ Element เข้า/ออกจาก Viewport
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ถ้า Element เข้ามาในหน้าจอ: ให้เพิ่มคลาส 'visible' (Fade In/Slide Up)
                entry.target.classList.add('visible');
            } else {
                // ถ้า Element เลื่อนออกไปนอกจอ: ให้ลบคลาส 'visible' (Fade Out/Slide Down)
                // (เพื่อให้ Animation เกิดซ้ำเมื่อเลื่อนกลับขึ้นมา)
                entry.target.classList.remove('visible'); 
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // เลือก Element ทั้งหมดที่มี Class ชื่อ .scroll-reveal
    const elementsToReveal = document.querySelectorAll('.scroll-reveal');
    
    // เริ่มสั่งให้ Observer ตรวจจับ Element เหล่านี้
    elementsToReveal.forEach(element => {
        observer.observe(element);
    });
});