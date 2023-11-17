let newObjIKKOText = {};
const productsArray = [];
const discountsArray = [];

const iikoText = document.querySelector(".iiko__text");
const btnConverter = document.querySelector(".btn__converter");
const btnShowTextArea = document.querySelector(".btn__show");

function transferJsonIIKO() {
  const parsedObj = JSON.parse(iikoText.value);

  iikoText.value = "";

  let phone = parsedObj.order.phone || parsedObj.order.tel;
  let numberOrder = parsedObj.order.number || parsedObj.order.order_id;
  let customerName = parsedObj.order.customer?.name || parsedObj.order.name;
  let mainSum =
    parsedObj.order.sum || parsedObj.order.fullSum || parsedObj.order.subtotal;
  // let paymentType = parsedObj.order.payments[0]?.paymentType?.name  parsedObj.order.payments[0]?.paymentTypeKind  parsedObj.order.payment_type
  let paymentType =
    parsedObj.order.payments &&
    parsedObj.order.payments[0] &&
    (parsedObj.order.payments[0]?.paymentType?.name ||
      parsedObj.order.payments[0]?.paymentTypeKind);
  parsedObj.order.payment_type;

  let paymentsSum =
    parsedObj.order.payments && parsedObj.order.payments[0]?.sum;
  parsedObj.order.sum;
  parsedObj.order.total;

  //   let nameDiscountType = parsedObj.order.discounts.discountType.name;
  //   let discountsSum = parsedObj.order.discounts.sum;

  let orderTypeName =
    parsedObj.order.orderType?.name || parsedObj.order.orderServiceType;
  let comment = parsedObj.order.comment;
  let coupon =
    parsedObj.order.loyaltyInfo?.coupon || parsedObj.order["_select-action"];
  let appliedManualConditions =
    parsedObj.order.loyaltyInfo?.appliedManualConditions || null;
  let deliveryDuration = parsedObj.order.deliveryDuration || null;
  let appVersion = parsedObj.app_v || null;
  let address = parsedObj.order.deliveryPoint
    ? `місто ${
        parsedObj.order.deliveryPoint.address.street.city.name ||
        parsedObj.order.deliveryPoint.address.street.city ||
        parsedObj.order.city
      }, ${
        parsedObj.order.deliveryPoint.address.street.name ||
        parsedObj.order.street
      } ${parsedObj.order.deliveryPoint.address.house || parsedObj.order.house}`
    : `місто ${parsedObj.order.city}, ${parsedObj.order.street} ${parsedObj.order.house}`;

  let whenCreated =
    parsedObj.order.whenCreated || parsedObj.order.completeBefore;
  let creationStatus = parsedObj.creationStatus || parsedObj.order.status;

  parsedObj.order.discounts?.forEach((item) => {
    const discountsName = `${item.discountType.name} / ${item.sum}`;
    discountsArray.push(discountsName);
  });

  parsedObj.order.items.forEach((item) => {
    let productName = `${item.product?.name || item.name || item.code} / ${
      item.cost || item.price
    } грн / ${item.amount} шт.`;

    // Додаємо modifiers, якщо вони є
    if (item.modifiers && item.modifiers.length > 0) {
      const modifiersInfo = item.modifiers.map((modifier) => {
        console.log(modifier);
        return `${modifier.product?.name || modifier.name} ${
          modifier.amount
        } шт. ${modifier.price} грн /`;
      });
      productName += ` / ${modifiersInfo.join(", ")}`;
    }

    console.log(productName);
    productsArray.push(productName);
  });

  console.log(productsArray);

  newObjIKKOText = {
    phone,
    customerName,
    mainSum,
    numberOrder,
    paymentType,
    paymentsSum,
    orderTypeName,
    comment,
    productsArray,
    coupon,
    appliedManualConditions,
    deliveryDuration,
    address,
    whenCreated,
    creationStatus,
    appVersion,
  };
  console.log(newObjIKKOText.appVersion);
  const numberElement = document.querySelector("#numberOutput");
  const phoneNumberElement = document.querySelector("#phoneOutput");
  const nameElement = document.querySelector("#nameOutput");
  const sumElement = document.querySelector("#sumOutput");

  const paymentTypeElement = document.querySelector("#paymentTypeOutput");
  const paymentsSumElement = document.querySelector("#paymentsSumOutput");

  const orderTypeElement = document.querySelector("#orderTypeOutput");
  const commentElement = document.querySelector("#commentOutput");

  const couponElement = document.querySelector("#couponOutput");
  const appliedManualConditionsOutputElement = document.querySelector(
    "#appliedManualConditionsOutput"
  );
  const deliveryDurationElement = document.querySelector(
    "#deliveryDurationOutput"
  );

  const addressElement = document.querySelector("#address");
  const whenCreatedElement = document.querySelector("#whenCreatedOutput");
  const creationStatusElement = document.querySelector("#creationStatusOutput");
  const versionAppElement = document.querySelector("#appVersionOutput");

  // Оновлюємо вміст елементу <p> і вставляємо дані
  numberElement.textContent = `${newObjIKKOText.numberOrder}`;
  nameElement.textContent = `${newObjIKKOText.customerName}`;
  phoneNumberElement.textContent = `${newObjIKKOText.phone}`;
  sumElement.textContent = `${newObjIKKOText.mainSum}`;

  paymentTypeElement.textContent = `${newObjIKKOText.paymentType}`;
  paymentsSumElement.textContent = `${newObjIKKOText.paymentsSum}`;
  addressElement.textContent = ` ${newObjIKKOText.address}`;
  orderTypeElement.textContent = ` ${newObjIKKOText.orderTypeName}`;
  commentElement.textContent = `${newObjIKKOText.comment}`;
  couponElement.textContent = ` ${newObjIKKOText.coupon}`;
  appliedManualConditionsOutputElement.textContent = `${newObjIKKOText.appliedManualConditions}`;
  deliveryDurationElement.textContent = ` ${newObjIKKOText.deliveryDuration}`;
  whenCreatedElement.textContent = ` ${newObjIKKOText.whenCreated}`;
  creationStatusElement.textContent = ` ${newObjIKKOText.creationStatus}`;
  versionAppElement.textContent = `${newObjIKKOText.appVersion}`;

  createTableProducts();

  parsedObj.order.payments !== null ? createTableDiscount() : null;

  // btnConverter.style.display = 'none'
  // iikoText.style.display = 'none'
  // btnShowTextArea.style.display = 'block'
}

function createTableProducts() {
  // Отримуємо батьківський елемент, до якого додаємо таблицю
  const tableContainer = document.getElementById("container__table_products");
  tableContainer.innerHTML = "";

  // Створюємо елемент таблиці
  const table = document.createElement("table");

  // Створюємо заголовок таблиці
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  // Масив із назвами колонок
  const columns = ["Назва продуктів 🍽", "Ціна 💰", "Кількість 📦"];

  // Додаємо заголовки до заголовка таблиці
  columns.forEach((column) => {
    const th = document.createElement("th");
    th.textContent = column;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Створюємо тіло таблиці
  const tbody = document.createElement("tbody");

  // Додаємо дані до тіла таблиці
  productsArray.forEach((product) => {
    // Розділяємо рядок на окремі дані
    const [name, price, quantity, modifiers] = product.split(" / ");

    // Створюємо новий рядок таблиці
    const row = document.createElement("tr");

    // Додаємо клітинки до рядка
    const nameCell = document.createElement("td");
    nameCell.textContent = name.trim(); // обрізаємо пробіли

    const priceCell = document.createElement("td");
    priceCell.textContent = price.trim();

    const quantityCell = document.createElement("td");
    quantityCell.textContent = quantity.trim();

    // Додаємо клітинки до рядка
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);

    // Додаємо рядок до тіла таблиці
    tbody.appendChild(row);

    // Перевіряємо, чи є модифікатори і додаємо їх окремими рядками з класом "modifier-row"
    if (modifiers) {
      const modifiersArray = modifiers.split(", "); // Розділяємо модифікатори за комою
      modifiersArray.forEach((modifier) => {
        const modifierRow = document.createElement("tr");
        modifierRow.classList.add("modifier-row"); // Додаємо клас "modifier-row"
        const modifierCell = document.createElement("td");
        modifierCell.colSpan = 3; // Займає всі три колонки
        modifierCell.textContent = `${modifier.trim()}`;
        modifierRow.appendChild(modifierCell);
        tbody.appendChild(modifierRow);
      });
    }
  });

  table.appendChild(tbody);

  // Додаємо таблицю до контейнера
  tableContainer.appendChild(table);
}

function createTableDiscount() {
  // Отримуємо батьківський елемент, до якого додаємо таблицю
  const tableContainer = document.getElementById("container__table_discounts");
  tableContainer.innerHTML = "";
  // Створюємо елемент таблиці
  const table = document.createElement("table");

  // Створюємо заголовок таблиці
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  // Масив із назвами колонок
  const columns = ["Назва знижка 🤑", "Ціна 💰"];

  // Додаємо заголовки до заголовка таблиці
  columns.forEach((column) => {
    const th = document.createElement("th");
    th.textContent = column;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Створюємо тіло таблиці
  const tbody = document.createElement("tbody");

  // Додаємо дані до тіла таблиці
  discountsArray.forEach((product) => {
    // Розділяємо рядок на окремі дані
    const [name, price] = product.split(" / ");

    // Створюємо новий рядок таблиці
    const row = document.createElement("tr");

    // Додаємо клітинки до рядка
    const nameCell = document.createElement("td");
    nameCell.textContent = name.trim(); // обрізаємо пробіли

    const priceCell = document.createElement("td");
    priceCell.textContent = price.trim();

    // Додаємо клітинки до рядка
    row.appendChild(nameCell);
    row.appendChild(priceCell);

    // Додаємо рядок до тіла таблиці
    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  // Додаємо таблицю до контейнера
  tableContainer.appendChild(table);
}
btnConverter.addEventListener("click", transferJsonIIKO);

// function showTexArea(){
//   btnConverter.style.display = 'block'
//   iikoText.style.display = 'block'
//   btnShowTextArea.style.display = 'none'
// }

// btnShowTextArea.addEventListener("click", showTexArea)
