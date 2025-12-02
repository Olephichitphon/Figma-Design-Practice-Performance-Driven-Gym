// ----------------------------------------------------
// 1. Hamburger Menu (ใช้ร่วมกับ onclick="toggleHam(this)")
// ----------------------------------------------------
function toggleHam(x) {
    // 1. จัดการการเปลี่ยนสถานะของปุ่ม Hamburger (เพิ่ม/ลบ class "change")
    x.classList.toggle("change");

    // 2. จัดการการเปิด/ปิด Menu Wrapper
    let myMenu = document.getElementById("myMenu");
    
    // โค้ดนี้ใช้การแทนที่ className ทั้งหมด (วิธีเก่า)
    if (myMenu.className === "nav-wrapper") {
        myMenu.className += " menu-active"; // เปิด Menu: nav-wrapper menu-active
    } else {
        myMenu.className = "nav-wrapper"; // ปิด Menu: nav-wrapper
    }
}


// ----------------------------------------------------
// 2. Scroll Reveal Animation (Intersection Observer)
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
                entry.target.classList.add('visible');
            } else {
                // ให้ Animation เกิดซ้ำเมื่อเลื่อนกลับขึ้นมา
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
// ----------------------------------------------------
// 3. โค้ดสำหรับโหลด Navbar และ Footer (ใช้ Fetch API)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    
    // ฟังก์ชันสำหรับดึงเนื้อหาจากไฟล์ HTML และแทรกใน Element ที่มี ID
    function loadHTML(elementId, filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(htmlContent => {
                const placeholder = document.getElementById(elementId);
                if (placeholder) {
                    placeholder.innerHTML = htmlContent;
                    
                    // 💥 (ลบ setupHamburgerToggle() ออกจากตรงนี้ เพราะใช้ toggleHam(x) แล้ว)
                    // (ไม่มีการเรียก setupHamburgerToggle ในโค้ดเดิมที่ใช้งานได้)
                }
            })
            .catch(error => console.error('Error loading HTML:', error));
    }
    
    // โหลด Navbar และ Footer
    loadHTML('navbar-placeholder', 'navbar.html');
    loadHTML('footer-placeholder', 'footer.html');
    
    // 💥 (ลบ setupHamburgerToggle() และโค้ดที่ไม่เกี่ยวข้องกับ toggleHam(x) ออกจากตรงนี้)
});