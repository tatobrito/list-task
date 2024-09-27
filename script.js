const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const inProgressList = document.getElementById('inProgressList');
const completedList = document.getElementById('completedList');
const generateReportButton = document.getElementById('generateReport');

// Função para adicionar tarefa na lista "Nova"
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('taskStatus').value;

    if (taskName === "") {
        alert("Please fill in all fields.");
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.classList.add('bg-purple-900', 'p-4', 'rounded-lg', 'shadow', 'flex', 'justify-between', 'items-start', 'relative');

    taskItem.innerHTML = `
        <div>
            <p class="text-yellow-300 font-bold mb-1">${capitalizeFirstLetter(taskStatus)}</p>
            <h4 class="font-bold">${taskName}</h4>
        </div>
        <div class="flex space-x-4">
            <button class="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Start</button>
            <button class="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">Remove</button>
        </div>
    `;

    taskItem.querySelector('.bg-green-500').addEventListener('click', function() {
        moveToInProgress(taskItem, taskName, taskStatus);
    });

    taskItem.querySelector('.bg-red-500').addEventListener('click', function() {
        taskItem.remove();
    });

    taskList.appendChild(taskItem);
    taskForm.reset();
});

// Função para mover tarefa para a lista "Em Progresso"
function moveToInProgress(taskItem, taskName, taskStatus) {
    taskItem.remove();

    const inProgressItem = document.createElement('li');
    inProgressItem.classList.add('bg-purple-800', 'p-4', 'rounded-lg', 'shadow', 'flex', 'justify-between', 'items-start', 'relative');

    inProgressItem.innerHTML = `
        <div>
            <p class="text-yellow-300 font-bold mb-1">${capitalizeFirstLetter(taskStatus)}</p>
            <h4 class="font-bold">${taskName}</h4>
        </div>
        <div class="flex space-x-4">
            <button class="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">Complete</button>
            <button class="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">Remove</button>
        </div>
    `;

    inProgressItem.querySelector('.bg-green-600').addEventListener('click', function() {
        moveToCompleted(inProgressItem, taskName, taskStatus);
    });

    inProgressItem.querySelector('.bg-red-500').addEventListener('click', function() {
        inProgressItem.remove();
    });

    inProgressList.appendChild(inProgressItem);
}

// Função para mover tarefa para a lista "Concluída"
function moveToCompleted(inProgressItem, taskName, taskStatus) {
    inProgressItem.remove();

    const completedItem = document.createElement('li');
    completedItem.classList.add('bg-purple-700', 'p-4', 'rounded-lg', 'shadow', 'flex', 'justify-between', 'items-start', 'relative');

    completedItem.innerHTML = `
        <div>
            <p class="text-yellow-300 font-bold mb-1">${capitalizeFirstLetter(taskStatus)}</p>
            <h4 class="font-bold">${taskName}</h4>
        </div>
    `;

    completedList.appendChild(completedItem);
}

// Função para capitalizar a primeira letra de uma string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função para gerar o relatório
generateReportButton.addEventListener('click', function() {
    let report = '';

    // Função auxiliar para coletar informações de cada lista
    function collectTaskData(list, status) {
        const tasks = list.querySelectorAll('li');
        tasks.forEach(task => {
            const taskName = task.querySelector('h4').textContent;
            const taskType = task.querySelector('p').textContent;
            report += `Tarefa: ${taskName}\nTipo: ${taskType}\nStatus: ${status}\n\n`;
        });
    }

    // Coletar dados das tarefas de cada lista
    collectTaskData(taskList, 'Nova');
    collectTaskData(inProgressList, 'Em Progresso');
    collectTaskData(completedList, 'Concluída');

    // Exibir o relatório em um alert ou baixar como arquivo
    if (report === '') {
        alert("Nenhuma tarefa registrada.");
    } else {
        downloadReport(report);
    }
});

// Função para baixar o relatório em um arquivo de texto
function downloadReport(content) {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'relatorio_de_tarefas.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
