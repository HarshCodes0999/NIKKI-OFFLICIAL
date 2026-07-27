import MEMORY from "./Brain/Memory.js";

/* ==========================================
   MEMORY UI
========================================== */

const memoryList = document.getElementById("memoryList");

const importantMemoryList = document.getElementById("importantMemoryList");

const totalMemories = document.getElementById("totalMemories");

const todayMemories = document.getElementById("todayMemories");

const storageUsed = document.getElementById("storageUsed");

const memoryStatus = document.getElementById("memoryStatus");

/* ==========================================
   INITIALIZE
========================================== */

MEMORY.initialize();

updateStats();

renderMemories();

/* ==========================================
   UPDATE STATS
========================================== */

function updateStats(){

    const memories = MEMORY.recallAll();

    totalMemories.textContent = memories.length;

    todayMemories.textContent = memories.length;

    storageUsed.textContent = `${JSON.stringify(memories).length} Bytes`;

    memoryStatus.textContent = MEMORY.status().status;

}

/* ==========================================
   RENDER MEMORIES
========================================== */

function renderMemories(){

    const memories = MEMORY.recallAll();

    memoryList.innerHTML = "";

    importantMemoryList.innerHTML = "";

    const emptyMemory = document.getElementById("emptyMemory");

    if(memories.length === 0){

        emptyMemory.style.display = "block";

        return;

    }

    emptyMemory.style.display = "none";

    memories.forEach(memory=>{

        const card=document.createElement("div");

        card.className="memory-card";

        card.innerHTML=`

            <h3>Memory #${memory.id}</h3>

            <p>${memory.data}</p>

            <span>

                ${new Date(memory.createdAt).toLocaleString()}

            </span>

        `;

        card.addEventListener("click",()=>{

            showMemory(memory);

        });

        memoryList.appendChild(card);

    });

}

/* ==========================================
   MEMORY DETAILS
========================================== */

function showMemory(memory){

    const modal=document.getElementById("memoryModal");

    const details=document.getElementById("memoryDetails");

    details.innerHTML=`

        <h3>Memory #${memory.id}</h3>

        <br>

        <p>${memory.data}</p>

        <br>

        <small>

            ${new Date(memory.createdAt).toLocaleString()}

        </small>

    `;

    modal.style.display="flex";

}

/* ==========================================
   CLOSE MODAL
========================================== */

document
.getElementById("closeMemoryModal")
.addEventListener("click",()=>{

    document
    .getElementById("memoryModal")
    .style.display="none";

});

/* ==========================================
   ADD MEMORY
========================================== */

document
.getElementById("addMemory")
.addEventListener("click",()=>{

    const text=prompt("Enter New Memory");

    if(!text) return;

    MEMORY.remember(text);

    updateStats();

    renderMemories();

});

/* ==========================================
   CLEAR MEMORY
========================================== */

document
.getElementById("clearMemory")
.addEventListener("click",()=>{

    if(!confirm("Clear All Memories?")) return;

    MEMORY.clear();

    updateStats();

    renderMemories();

});

/* ==========================================
   SEARCH MEMORY
========================================== */

document
.getElementById("searchMemory")
.addEventListener("input",(event)=>{

    const query=event.target.value.toLowerCase();

    const cards=document.querySelectorAll(".memory-card");

    cards.forEach(card=>{

        const text=card.innerText.toLowerCase();

        card.style.display=text.includes(query)
            ? "block"
            : "none";

    });

});

/* ==========================================
   EXPORT MEMORY
========================================== */

document
.getElementById("exportMemory")
.addEventListener("click",()=>{

    const data=JSON.stringify(
        MEMORY.recallAll(),
        null,
        2
    );

    const blob=new Blob([data],{
        type:"application/json"
    });

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="NIKKI_Memory_Backup.json";

    a.click();

    URL.revokeObjectURL(url);

});

/* ==========================================
   IMPORT MEMORY
========================================== */

document
.getElementById("importMemory")
.addEventListener("click",()=>{

    document
    .getElementById("memoryImportFile")
    .click();

});

document
.getElementById("memoryImportFile")
.addEventListener("change",(event)=>{

    const file=event.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=(e)=>{

        try{

            const memories=JSON.parse(e.target.result);

            MEMORY.clear();

            memories.forEach(memory=>{

                MEMORY.remember(memory.data);

            });

            updateStats();

            renderMemories();

            alert("Memory Imported Successfully");

        }catch{

            alert("Invalid Backup File");

        }

    };

    reader.readAsText(file);

});

/* ==========================================
   CLOSE MODAL ON OUTSIDE CLICK
========================================== */

window.addEventListener("click",(event)=>{

    const modal=document.getElementById("memoryModal");

    if(event.target===modal){

        modal.style.display="none";

    }

});

/* ==========================================
   REFRESH UI
========================================== */

updateStats();

renderMemories();