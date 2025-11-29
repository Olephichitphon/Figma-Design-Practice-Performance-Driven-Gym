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

/*...............................................................................................*/
/*โคดJavascript สำหรับโหลด Navbar และ Footer จากไฟล์แยกต่างหาก*/
document.addEventListener('DOMContentLoaded', () => {
    
    // ฟังก์ชันสำหรับดึงเนื้อหาจากไฟล์ HTML และแทรกใน Element ที่มี ID
    function loadHTML(elementId, filePath) {
        // ใช้ Fetch API เพื่อโหลดเนื้อหาของไฟล์ HTML
        fetch(filePath)
            .then(response => {
                // ตรวจสอบสถานะการตอบกลับ
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(htmlContent => {
                const placeholder = document.getElementById(elementId);
                if (placeholder) {
                    // แทรกโค้ด HTML ที่โหลดมาลงใน Placeholder
                    placeholder.innerHTML = htmlContent;
                    
                    // 💥 สำคัญ: เมื่อโหลด Navbar เสร็จแล้ว ค่อยเรียกใช้ฟังก์ชัน Hamburger
                    if (elementId === 'navbar-placeholder') {
                        setupHamburgerToggle();
                    }
                }
            })
            .catch(error => console.error('Error loading HTML:', error));
    }
    
    // โหลด Navbar และ Footer
    loadHTML('navbar-placeholder', 'navbar.html');
    loadHTML('footer-placeholder', 'footer.html');
    
    
    // 💥 ฟังก์ชันสำหรับจัดการ Hamburger Toggle (ต้องเรียกใช้หลังโหลด HTML เสร็จ)
    function setupHamburgerToggle() {
        // โค้ด Hamburger Toggle เดิมของคุณ (ปรับปรุงให้ใช้ Class/ID ที่ถูกต้อง)
        const hamburger = document.querySelector('.hamburger-icon');
        const navWrapper = document.getElementById('myMenu'); 
        
        if (hamburger && navWrapper) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navWrapper.classList.toggle('menu-active');
            });
        }
    }
    
});

// *หมายเหตุ: ถ้าคุณยังใช้ onclick="toggleHam(this)" ใน HTML ให้เปลี่ยนเป็นใช้ Event Listener ใน JS ตามโค้ดนี้แทนครับ