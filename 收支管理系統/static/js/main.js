let chartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    // 預設當前年月
    const now = new Date();
    const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    document.getElementById('currentMonth').value = currentMonthStr;
    document.getElementById('date').value = now.toISOString().split('T')[0];

    // 初始化載入
    loadData();

    // 監聽月份變更
    document.getElementById('currentMonth').addEventListener('change', loadData);

    // 監聽表單提交
    document.getElementById('recordForm').addEventListener('submit', handleFormSubmit);
});

// 載入當月資料
async function loadData() {
    const month = document.getElementById('currentMonth').value;
    const res = await fetch(`/api/records?month=${month}`);
    const data = await res.json();

    // 更新面板數據
    document.getElementById('totalIncome').textContent = `$${data.total_income.toLocaleString()}`;
    document.getElementById('totalExpense').textContent = `$${data.total_expense.toLocaleString()}`;
    document.getElementById('totalBalance').textContent = `$${data.balance.toLocaleString()}`;

    // 更新預算 UI 與提醒
    updateBudgetUI(data.total_expense, data.budget);

    // 更新明細清單
    renderRecordList(data.records);

    // 更新圖表
    renderChart(data.category_summary);
}

// 預算 UI 與超支提醒 Logic
function updateBudgetUI(expense, budget) {
    const statusText = document.getElementById('budgetStatus');
    const progressBar = document.getElementById('budgetProgress');
    const alertBanner = document.getElementById('overBudgetAlert');

    if (budget <= 0) {
        statusText.textContent = '本月未設定預算';
        progressBar.style.width = '0%';
        alertBanner.style.display = 'none';
        return;
    }

    const percent = Math.min((expense / budget) * 100, 100);
    statusText.textContent = `本月預算：$${expense.toLocaleString()} / $${budget.toLocaleString()}`;
    progressBar.style.width = `${percent}%`;

    if (expense > budget) {
        progressBar.style.backgroundColor = '#ff6b6b';
        alertBanner.style.display = 'block';
    } else {
        progressBar.style.backgroundColor = '#4ecdc4';
        alertBanner.style.display = 'none';
    }
}

// 繪製 Chart.js 支出圓餅圖
function renderChart(categorySummary) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy();
    }

    const labels = categorySummary.map(c => c.category);
    const amounts = categorySummary.map(c => c.total);

    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.length ? labels : ['尚無支出'],
            datasets: [{
                data: amounts.length ? amounts : [1],
                backgroundColor: [
                    '#4ECDC4', '#2AB7CA', '#FF6B6B', '#FFD166', '#06D6A0', '#118AB2'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// 渲染明細清單
function renderRecordList(records) {
    const list = document.getElementById('recordList');
    list.innerHTML = '';

    if (records.length === 0) {
        list.innerHTML = '<li style="text-align: center; color: #888; padding: 15px;">本月尚無紀錄</li>';
        return;
    }

    records.forEach(r => {
        const li = document.createElement('li');
        li.className = 'record-item';
        const isExpense = r.type === 'expense';
        const sign = isExpense ? '-' : '+';
        const colorClass = isExpense ? 'expense' : 'income';

        li.innerHTML = `
            <div>
                <strong>[${r.category}]</strong> ${r.note ? r.note + ' ' : ''}
                <small style="color: #888;">(${r.date})</small>
            </div>
            <div>
                <span class="amount ${colorClass}" style="font-size: 1.1rem; margin-right: 10px;">
                    ${sign}$${r.amount}
                </span>
                <button class="btn-delete" onclick="deleteRecord(${r.id})">✖</button>
            </div>
        `;
        list.appendChild(li);
    });
}

// 提交紀錄
async function handleFormSubmit(e) {
    e.preventDefault();
    const payload = {
        type: document.getElementById('type').value,
        category: document.getElementById('category').value,
        amount: document.getElementById('amount').value,
        date: document.getElementById('date').value,
        note: document.getElementById('note').value
    };

    await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('note').value = '';

    loadData();
}

// 刪除紀錄
async function deleteRecord(id) {
    if (!confirm('確定要刪除這筆紀錄嗎？')) return;
    await fetch(`/api/records/${id}`, { method: 'DELETE' });
    loadData();
}

// 設定預算 Prompt
async function promptSetBudget() {
    const month = document.getElementById('currentMonth').value;
    const amount = prompt(`請輸入 ${month} 月的預算金額：`);
    if (amount !== null && amount !== '') {
        await fetch('/api/budget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ month, amount: parseFloat(amount) })
        });
        loadData();
    }
}