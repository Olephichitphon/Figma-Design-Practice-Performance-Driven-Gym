// ----------------------------------------------------
// 1. ฟังก์ชันสำหรับจัดการ Hamburger Menu (ใช้ Event Listener)
// ----------------------------------------------------
function setupHamburgerToggle() {
    // เลือกปุ่ม Hamburger (ใช้ Class "ham-menu" ตามใน HTML)
    const hamburger = document.querySelector('.ham-menu'); 
    // เลือก Menu Wrapper (ใช้ ID "myMenu")
    const navWrapper = document.getElementById('myMenu'); 
    
    if (hamburger && navWrapper) {
        // ใช้ Event Listener แทน onclick
        hamburger.addEventListener('click', () => {
            // A. เปลี่ยนรูปทรง Hamburger (ใช้ Class 'change')
            hamburger.classList.toggle('change'); 

            // B. เปิด/ปิด Menu (ใช้ Class 'menu-active')
            navWrapper.classList.toggle('menu-active');
        });
    }
}


// ----------------------------------------------------
// 2. ฟังก์ชันสำหรับ Scroll Reveal Animation (Intersection Observer)
// ----------------------------------------------------
function setupScrollReveal() {
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

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
    const elementsToReveal = document.querySelectorAll('.scroll-reveal');
    
    elementsToReveal.forEach(element => {
        observer.observe(element);
    });
}


// ----------------------------------------------------
// 3. ฟังก์ชันสำหรับโหลด Navbar/Footer (ใช้ Fetch API)
// ----------------------------------------------------
function loadHTML(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                // ตรวจจับข้อผิดพลาด HTTP เช่น 404
                throw new Error(`HTTP error! status: ${response.status} for ${filePath}`);
            }
            return response.text();
        })
        .then(htmlContent => {
            const placeholder = document.getElementById(elementId);
            if (placeholder) {
                placeholder.innerHTML = htmlContent;
                
                // 💥 สำคัญ: เมื่อโหลด Navbar เสร็จแล้ว ค่อยเรียกใช้ฟังก์ชัน Hamburger
                if (elementId === 'navbar-placeholder') {
                    setupHamburgerToggle();
                }
            }
        })
        .catch(error => console.error('Error loading HTML:', error));
}


// ----------------------------------------------------
// 4. จุดเริ่มต้น: เมื่อ DOM โหลดเสร็จ
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. เริ่มใช้งาน Scroll Reveal
    setupScrollReveal();

    // 2. โหลด Navbar และ Footer
    // (หมายเหตุ: ใน index.html คุณได้ฝัง Navbar ไปแล้ว ดังนั้นการโหลดนี้จะใช้ในหน้าอื่นๆ)
    loadHTML('navbar-placeholder', 'navbar.html');
    loadHTML('footer-placeholder', 'footer.html');
    
    // 3. หากคุณไม่ได้ใช้การโหลด Navbar แยกในหน้า index.html 
    //    คุณต้องเรียกใช้ Hamburger Toggle โดยตรงในหน้า index.html ด้วย
    //    *คุณอาจต้องเรียกใช้ setupHamburgerToggle() ตรงนี้ในหน้า index.html*
});