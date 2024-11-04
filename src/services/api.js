export const fetchEmployees = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { Id: 1, Name: "George", Title: "CTO", ManagerId: null },
        { Id: 2, Name: "Michael", Title: "IT Manager", ManagerId: 1 },
        { Id: 3, Name: "Sarah", Title: "HR Manager", ManagerId: 1 },
        { Id: 4, Name: "Alice", Title: "Developer", ManagerId: 2 },
        { Id: 5, Name: "Bob", Title: "IT Support", ManagerId: 2 },
        { Id: 6, Name: "John", Title: "Intern", ManagerId: 5 },
        { Id: 7, Name: "Emma", Title: "Product Manager", ManagerId: 1 },
        { Id: 8, Name: "Oliver", Title: "Finance Manager", ManagerId: 3 },
        { Id: 9, Name: "Sophia", Title: "Recruiter", ManagerId: 3 },
        { Id: 10, Name: "Liam", Title: "Senior Developer", ManagerId: 4 },
        { Id: 11, Name: "Ava", Title: "Junior Developer", ManagerId: 4 },
        { Id: 12, Name: "James", Title: "System Analyst", ManagerId: 2 },
        { Id: 13, Name: "Mia", Title: "Office Manager", ManagerId: 3 },
        { Id: 14, Name: "Ethan", Title: "Data Scientist", ManagerId: 8 },
        { Id: 15, Name: "Isabella", Title: "HR Assistant", ManagerId: 9 },
        { Id: 16, Name: "Lucas", Title: "Marketing Manager", ManagerId: 7 },
        { Id: 17, Name: "Ella", Title: "Marketing Specialist", ManagerId: 16 },
        { Id: 18, Name: "Charlotte", Title: "Accountant", ManagerId: 8 },
        { Id: 19, Name: "Henry", Title: "Security Officer", ManagerId: 12 },
        {
          Id: 20,
          Name: "Amelia",
          Title: "Chief Marketing Officer",
          ManagerId: null,
        },
        { Id: 21, Name: "Jack", Title: "Sales Manager", ManagerId: 20 },
        { Id: 22, Name: "Victoria", Title: "Sales Associate", ManagerId: 21 },
        { Id: 23, Name: "Daniel", Title: "Graphic Designer", ManagerId: 7 },
        { Id: 24, Name: "Grace", Title: "Content Strategist", ManagerId: 17 },
        { Id: 25, Name: "Leo", Title: "SEO Specialist", ManagerId: 17 },
        {
          Id: 26,
          Name: "Madison",
          Title: "Customer Support Lead",
          ManagerId: 21,
        },
        {
          Id: 27,
          Name: "Chloe",
          Title: "Customer Support Agent",
          ManagerId: 26,
        },
        { Id: 28, Name: "Mason", Title: "Operations Manager", ManagerId: null },
        { Id: 29, Name: "Zoe", Title: "Logistics Coordinator", ManagerId: 28 },
        { Id: 30, Name: "Nora", Title: "Warehouse Manager", ManagerId: 28 },
        { Id: 31, Name: "Mason", Title: "Operations Manager", ManagerId: 103 },
        { Id: 32, Name: "Zoe", Title: "Logistics Coordinator", ManagerId: 233 },
        { Id: 33, Name: "Nora", Title: "Warehouse Manager", ManagerId: 333 },
      ]);
    }, 2000);
  });
};
export const submitSelectedEmployees = (selectedIds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: selectedIds });
    }, 1000);
  });
};
