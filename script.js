// const ค่าคงที่ , let เปลี่ยนแปลงได้

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');    
const text = document.getElementById('text');    //ชื่อธุรกรรม
const amount = document.getElementById('amount');   // จำนวนเงินที่ใส่

const dataTransaction=[]

let transaction = dataTransaction;

function init(){  //กรองข้อมูล
    list.innerHTML='';  // ทำให้ list เป็นค่าว่าง
    transaction.forEach(addDataTolist);
    calculateMoney();
}

function formatNumber(num) {  /* เอามาจากในเน็ต*/
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
/* สุ่มค่า ไอดี */
function autoID(){
    return Math.floor(Math.random()*1000000)  // สุ่มค่า
}


function addDataTolist(transaction){ //ประวัติธุรกรรม
    const symbol = transaction.amount < 0  ?'-' : '+';  // ถ้าค่าน้อยกว่า0 เป็นลบ ถ้ามากกว่า เป็นบวก  
    const status = transaction.amount < 0  ?'minus' : 'plus'; // เช็คสถานะ ถ้า transaction < 0 เก็บค่า minus ถ้าไม่ plus และส่งค่ากลับไป
    const item = document.createElement('li');
    result = formatNumber(Math.abs(transaction.amount));  // ใส่ comma คั่น
    item.classList.add(status);  // classlist เป็นการกำหนด class ไปไว้ใน <li> add ใน status

    //item.innerHTML = 'ค่าเลี้ยง <span>  - ฿400</span>  <button class="delete-btn">x</button>';
    item.innerHTML = `${transaction.text}<span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transaction.id})">x</button>`;  
    //รายชื่อธุรกรรม  span  สัญลักญณ์   ||  Math.abs --> ตัดเครื่องหมายออก 1 ตำแหน่ง
    
    
    list.appendChild(item); //การใส่ค่าลงไปใน list
    
}

function calculateMoney(){  //คำนวนเงินยอดคงเหลือ
    const amounts = transaction.map(transaction => transaction.amount);
    //ยอดคงเหลือ
    const total = amounts.reduce((result,item)=>(result+=item),0).toFixed(2); //(ผลลัพธ์จากการคำนวณ,ตัวที่ดึงมา)   .toFixed(2) ==> แสดงทศนิยม 2 ตำแหน่ง
    //รายรับ
    const income = amounts.filter(item=>item>0).reduce((result,item)=>(result+=item),0).toFixed(2); // .filter ==> กรองเอาเฉพาะค่า ตามเงื่อนไข
    //รายจ่าย
    const expense = (amounts.filter(item=>item<0).reduce((result,item)=>(result+=item),0)*-1).toFixed(2); //*-1 ไม่แสดงตำแหร่งแรก(-)
    
    
    //แสดงผล UI
    balance.innerText= `฿`+ formatNumber(total);
    money_plus.innerText= `฿`+ formatNumber(income);
    money_minus.innerText= `฿`+ formatNumber(expense);

}

/* ********* ส่วนของการเพิ่ม ธุรกรรม ********* */
function addTransaction(e){
    e.preventDefault();     // ให้ข้อมูลเก่ายังคงอยู่
    if(text.value.trim() === '' || amount.value.trim() === ''){     // ตรวจสอบค่าว่าง
        alert("กรุณาป้อนข้อมูลให้ครบถ้วน");
    }
    else{
        console.log(autoID());
        const data={        // โครงสร้างข้อมูล
            id:autoID(),    // สุ่มไอดี จากฟังก์ชัน
            text:text.value,// ชื่อธุรกรรม
            amount:+amount.value // จำนวน  ใส่+ เพราะ ต้องการค่า int จาก value
        }
        transaction.push(data);  //ใส่ค่า data ลงใน transaction
        addDataTolist(data);     //เพิ่ม data ลงใน addDataTolist  เพื่อแสดงประวัติธุรกรรม
        calculateMoney();        //คำนวณยอดคงเหลือ
        text.value='';      //เคลียค่า
        amount.value='';    //เคลียค่า
    }
    
}

function removeData(id){  // ลบธุรกรรม
    transaction = transaction.filter(transaction=>transaction.id !== id) //transaction.id !==id เหลือตัวที่ ไม่เท่ากับ id ที่ส่งมา
    init();
    // 1,2,3  > id=1 (จะลบ 1) ==> เอา 2,3 ไปเก็บใน transaction ไม่เก็บ 1 (เปรียบเสมือนการลบ)
}

form.addEventListener('submit',addTransaction);
init();

