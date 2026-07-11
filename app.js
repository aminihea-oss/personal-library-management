// ======================================
// سیستم مدیریت کتابخانه شخصی
// نویسنده: علی امینی
// ======================================

// ---------- ورود کاربر ----------
let userName = prompt("نام خود را وارد کنید:");

if (userName === null || userName.trim() === "") {
    userName = "مهمان";
}

alert("خوش آمدید " + userName);

// ---------- آرایه کتاب ها ----------
let books = [
    {
        title: "شازده کوچولو",
        author: "آنتوان دو سنت اگزوپری",
        pages: 96,
        genre: "رمان",
        status: "خوانده شده"
    },
    {
        title: "بوف کور",
        author: "صادق هدایت",
        pages: 220,
        genre: "داستان",
        status: "خوانده شده"
    },
    {
        title: "ملت عشق",
        author: "الیف شافاک",
        pages: 480,
        genre: "رمان",
        status: "در حال مطالعه"
    },
    {
        title: "سمفونی مردگان",
        author: "عباس معروفی",
        pages: 340,
        genre: "ادبی",
        status: "خوانده نشده"
    }
];

// ---------- ذخیره در LocalStorage ----------
if (localStorage.getItem("books")) {
    books = JSON.parse(localStorage.getItem("books"));
}

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// ---------- گرفتن عناصر صفحه ----------
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const genre = document.getElementById("genre");
const status = document.getElementById("status");

const addBook = document.getElementById("addBook");
const container = document.getElementById("bookContainer");
const counter = document.getElementById("bookCount");
const searchBox = document.getElementById("searchBox");
const loginBtn = document.getElementById("loginBtn");
// ======================================
// نمایش کتاب‌ها
// ======================================

function showBooks() {

    container.innerHTML = "";

    // اگر کتابی وجود نداشت
    if (books.length === 0) {

        container.innerHTML = `
            <h2 style="
                text-align:center;
                color:red;
                margin-top:40px;">
                هیچ کتابی در کتابخانه وجود ندارد.
            </h2>
        `;

        counter.innerText = 0;
        return;
    }

    // نمایش تعداد کتاب‌ها
    counter.innerText = books.length;

    // ساخت کارت هر کتاب
    books.forEach(function (book, index) {

        container.innerHTML += `

        <div class="book">

            <h3>${book.title}</h3>

            <p>
                <strong>نویسنده:</strong>
                ${book.author}
            </p>

            <p>
                <strong>تعداد صفحات:</strong>
                ${book.pages}
            </p>

            <p>
                <strong>ژانر:</strong>
                ${book.genre}
            </p>

            <p>
                <strong>وضعیت:</strong>
                ${book.status}
            </p>

            <button onclick="deleteBook(${index})">
                حذف کتاب
            </button>

        </div>

        `;

    });

}

// اولین نمایش کتاب‌ها
showBooks();
// ======================================
// افزودن کتاب جدید
// ======================================

addBook.onclick = function () {

    // حذف فاصله‌های اضافی
    let newTitle = title.value.trim();
    let newAuthor = author.value.trim();
    let newPages = pages.value.trim();
    let newGenre = genre.value.trim();
    let newStatus = status.value;

    // بررسی خالی بودن فیلدها
    if (
        newTitle === "" ||
        newAuthor === "" ||
        newPages === "" ||
        newGenre === ""
    ) {
        alert("لطفاً تمام فیلدها را پر کنید.");
        return;
    }

    // اعتبارسنجی تعداد صفحات
    if (isNaN(newPages) || Number(newPages) <= 0) {
        alert("تعداد صفحات باید بیشتر از صفر باشد.");
        return;
    }

    // بررسی تکراری نبودن کتاب
    let exist = books.some(function (book) {
        return book.title.toLowerCase() === newTitle.toLowerCase();
    });

    if (exist) {
        alert("این کتاب قبلاً ثبت شده است.");
        return;
    }

    // ساخت شیء کتاب
    let newBook = {
        title: newTitle,
        author: newAuthor,
        pages: Number(newPages),
        genre: newGenre,
        status: newStatus
    };

    // افزودن به آرایه
    books.push(newBook);

    // ذخیره در LocalStorage
    saveBooks();

    // نمایش مجدد کتاب‌ها
    showBooks();

    // پاک کردن فرم
    title.value = "";
    author.value = "";
    pages.value = "";
    genre.value = "";
    status.selectedIndex = 0;

    // قرار گرفتن مکان‌نما روی نام کتاب
    title.focus();

    alert("کتاب با موفقیت اضافه شد.");
};
// ======================================
// حذف کتاب
// ======================================

function deleteBook(index) {

    let answer = confirm("آیا از حذف این کتاب مطمئن هستید؟");

    if (answer) {

        books.splice(index, 1);

        // ذخیره تغییرات
        saveBooks();

        // نمایش دوباره کتاب‌ها
        showBooks();

        alert("کتاب با موفقیت حذف شد.");
    }

}

// ======================================
// جستجوی کتاب
// ======================================

searchBox.addEventListener("keyup", function () {

    let search = searchBox.value.toLowerCase().trim();

    let cards = document.querySelectorAll(".book");

    cards.forEach(function (card) {

        let text = card.innerText.toLowerCase();

        if (text.includes(search)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

// ======================================
// جستجو با Enter
// ======================================

searchBox.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        e.preventDefault();

    }

});

// ======================================
// نمایش تعداد کتاب‌ها
// ======================================

function updateCounter() {

    counter.innerText = books.length;

}

updateCounter();
// ======================================
// ورود دوباره
// ======================================

loginBtn.onclick = function () {

    let name = prompt("نام خود را وارد کنید:");

    if (name === null || name.trim() === "") {

        alert("سلام مهمان");

    } else {

        alert("سلام " + name);

    }

};

// ======================================
// تغییر تم (روشن / تیره)
// ======================================

let dark = false;

const themeBtn = document.createElement("button");

themeBtn.id = "themeBtn";
themeBtn.innerText = "🌙 تغییر تم";

themeBtn.style.margin = "20px";
themeBtn.style.padding = "10px 20px";
themeBtn.style.cursor = "pointer";
themeBtn.style.border = "none";
themeBtn.style.borderRadius = "8px";
themeBtn.style.background = "#007bff";
themeBtn.style.color = "#fff";

document.body.insertBefore(themeBtn, document.body.firstChild);

themeBtn.onclick = function () {

    dark = !dark;

    if (dark) {

        document.body.classList.add("dark");
        themeBtn.innerText = "☀️ حالت روشن";

    } else {

        document.body.classList.remove("dark");
        themeBtn.innerText = "🌙 تغییر تم";

    }

};

// ======================================
// ساعت زنده
// ======================================

function updateClock() {

    const clock = document.getElementById("clock");

    if (clock) {

        const now = new Date();

        clock.innerText =
            now.toLocaleDateString("fa-IR") +
            " | " +
            now.toLocaleTimeString("fa-IR");

    }

}

updateClock();

setInterval(updateClock, 1000);

// ======================================
// ذخیره اولیه اطلاعات
// ======================================

saveBooks();

// ======================================
// نمایش اولیه
// ======================================

showBooks();

console.log("سیستم مدیریت کتابخانه با موفقیت اجرا شد.");