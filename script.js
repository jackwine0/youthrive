document.addEventListener("DOMContentLoaded", function() {
    const employees = [
        { name: "Akande Samuel", id: "001", role: "Developer", status: "active", team: "product" },
        { name: "Chinedu Okafor", id: "002", role: "Designer", status: "inactive", team: "marketing" },
        { name: "Fatima Ibrahim", id: "003", role: "Product Manager", status: "active", team: "product" },
        // Add more employee objects as needed
    ];
    
    const rowsPerPage = 5;
    let currentPage = 1;

    function displayEmployees(page) {
        const tableBody = document.querySelector("#employeeTable tbody");
        tableBody.innerHTML = "";

        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedEmployees = employees.slice(start, end);

        paginatedEmployees.forEach(employee => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.id}</td>
                <td>${employee.role}</td>
                <td>${employee.status}</td>
                <td>${employee.team}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            displayEmployees(currentPage);
        }
    }

    function nextPage() {
        if ((currentPage * rowsPerPage) < employees.length) {
            currentPage++;
            displayEmployees(currentPage);
        }
    }

    function searchEmployees() {
        const name = document.getElementById("employeeName").value.toLowerCase();
        const id = document.getElementById("employeeID").value.toLowerCase();
        const role = document.getElementById("employeeRole").value.toLowerCase();
        const status = document.getElementById("employeeStatus").value.toLowerCase();
        const team = document.getElementById("employeeTeam").value.toLowerCase();

        const filteredEmployees = employees.filter(employee => {
            return (
                (name === "" || employee.name.toLowerCase().includes(name)) &&
                (id === "" || employee.id.toLowerCase().includes(id)) &&
                (role === "" || employee.role.toLowerCase().includes(role)) &&
                (status === "" || employee.status.toLowerCase().includes(status)) &&
                (team === "" || employee.team.toLowerCase().includes(team))
            );
        });

        displayEmployees(filteredEmployees, currentPage);
    }

    function filterEmployees(type) {
        let filteredEmployees;
        if (type === 'all') {
            filteredEmployees = employees;
        } else if (type === 'recent') {
            filteredEmployees = employees.slice(-5); // Last 5 employees as recent hires
        }
        displayEmployees(filteredEmployees, currentPage);
    }

    function showAssignRoles() {
        document.getElementById("assignRoles").style.display = "block";
    }

    // Initial display of employees
    displayEmployees(currentPage);

    // Event listeners for pagination buttons
    document.querySelector(".pagination button:first-child").addEventListener("click", prevPage);
    document.querySelector(".pagination button:last-child").addEventListener("click", nextPage);

    // Event listener for assign roles button
    document.querySelectorAll("button[onclick='showAssignRoles()']").forEach(button => {
        button.addEventListener("click", showAssignRoles);
    });
});
