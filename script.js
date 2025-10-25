document.addEventListener('DOMContentLoaded', () => {
  const downloadReportBtn = document.getElementById('downloadReportBtn');
  
  if (downloadReportBtn) {
    downloadReportBtn.addEventListener('click', () => {
      alert('Downloading report... (This is a placeholder action)');
      console.log('Download Report button clicked.');
      // In a real application, you might trigger a file download or a report generation API call
    });
  }
  
  // You could expand this with more complex chart rendering logic using libraries
  // like Chart.js or D3.js if you had dynamic data.
});

///

document.addEventListener('DOMContentLoaded', () => {
  // Handle Personal Information Form submission
  const personalInfoForm = document.getElementById('personalInfoForm');
  if (personalInfoForm) {
    personalInfoForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      
      const fullName = document.getElementById('fullName').value;
      const studentId = document.getElementById('studentId').value;
      const email = document.getElementById('email').value;
      const department = document.getElementById('department').value;
      
      console.log('--- Personal Information Updated ---');
      console.log('Full Name:', fullName);
      console.log('Student ID:', studentId);
      console.log('Email:', email);
      console.log('Department:', department);
      
      alert('Personal Information updated successfully!');
    });
  }
  
  // Handle Notification Preferences Form submission
  const notificationPrefsForm = document.getElementById('notificationPrefsForm');
  if (notificationPrefsForm) {
    notificationPrefsForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      
      const emailNotifications = document.getElementById('emailNotifications').checked;
      const pushNotifications = document.getElementById('pushNotifications').checked;
      const weeklyDigest = document.getElementById('weeklyDigest').checked;
      const campusAnnouncements = document.getElementById('campusAnnouncements').checked;
      
      console.log('--- Notification Preferences Saved ---');
      console.log('Email Notifications:', emailNotifications);
      console.log('Push Notifications:', pushNotifications);
      console.log('Weekly Digest:', weeklyDigest);
      console.log('Campus Announcements:', campusAnnouncements);
      
      alert('Notification Preferences saved successfully!');
    });
  }
});

///

document.addEventListener('DOMContentLoaded', () => {
  // Function to handle "Approve" or "Reject"
  function handleSuggestionAction(event) {
    const button = event.target;
    const suggestionItem = button.closest('.suggestion-item');
    const suggestionId = suggestionItem.dataset.suggestionId;
    const suggestionTitle = suggestionItem.querySelector('.suggestion-title').textContent;
    
    if (button.classList.contains('approve-btn')) {
      alert(`Suggestion "${suggestionTitle}" (ID: ${suggestionId}) approved!`);
      console.log(`Approved suggestion: ${suggestionTitle} (ID: ${suggestionId})`);
    } else if (button.classList.contains('reject-btn')) {
      alert(`Suggestion "${suggestionTitle}" (ID: ${suggestionId}) rejected.`);
      console.log(`Rejected suggestion: ${suggestionTitle} (ID: ${suggestionId})`);
    }
    
    // In a real application, you would send this to a backend and then
    // re-render the list or remove the item dynamically.
    // For this front-end, we'll just remove it from the DOM.
    suggestionItem.remove();
  }
  
  // Add event listeners to all Approve/Reject buttons
  document.querySelectorAll('.approve-btn').forEach(button => {
    button.addEventListener('click', handleSuggestionAction);
  });
  
  document.querySelectorAll('.reject-btn').forEach(button => {
    button.addEventListener('click', handleSuggestionAction);
  });
  
  // Optional: Click handler for KPI links if they navigate somewhere
  document.querySelectorAll('.kpi-link').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent actual navigation for this demo
      console.log(`Clicked KPI link: ${link.textContent.trim()}`);
      alert(`Navigating to ${link.textContent.trim()} section...`);
    });
  });
  
  // Optional: Click handler for View Profile links
  document.querySelectorAll('.view-profile-link').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent actual navigation for this demo
      const userName = link.closest('.user-item').querySelector('.user-name').textContent;
      console.log(`Clicked View Profile for: ${userName}`);
      alert(`Viewing profile for ${userName}...`);
    });
  });
});