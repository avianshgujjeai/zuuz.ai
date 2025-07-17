export const mockEmails = [
  // Unanswered emails > 48 hours
  {
    id: 'email-1',
    category: 'unanswered',
    sender: 'Sarah Johnson',
    subject: 'Urgent: Q4 Budget Review Required',
    content: 'Hi there, I need your input on the Q4 budget allocations. The finance team is waiting for your department\'s numbers. Can you please review the attached spreadsheet and provide your feedback by tomorrow? This is critical for our quarterly planning.',
    time: '3 days ago',
    priority: 'high',
    type: 'urgent-budget'
  },
  {
    id: 'email-2',
    category: 'unanswered',
    sender: 'Mike Chen',
    subject: 'Project Timeline Concerns',
    content: 'I wanted to follow up on our discussion about the project timeline. The client is asking for updates and I\'m concerned we might miss the deadline. Can we schedule a quick call to discuss the current status and potential solutions?',
    time: '2 days ago',
    priority: 'high',
    type: 'project-delay'
  },
  {
    id: 'email-3',
    category: 'unanswered',
    sender: 'Emily Davis',
    subject: 'Marketing Campaign Approval Needed',
    content: 'The marketing campaign materials are ready for your review. We need approval by Friday to meet the launch date. Please let me know if you have any feedback or if we can proceed as planned.',
    time: '2 days ago',
    priority: 'medium',
    type: 'approval-request'
  },
  {
    id: 'email-4',
    category: 'unanswered',
    sender: 'David Wilson',
    subject: 'Team Meeting Reschedule Request',
    content: 'Hi, I need to reschedule our weekly team meeting due to a client emergency. Are you available on Thursday at 2 PM instead of our usual Tuesday slot? Please confirm so I can update the calendar.',
    time: '3 days ago',
    priority: 'medium',
    type: 'meeting-reschedule'
  },
  {
    id: 'email-5',
    category: 'unanswered',
    sender: 'Lisa Anderson',
    subject: 'HR Policy Update - Action Required',
    content: 'We\'ve updated our remote work policy and need all team leads to acknowledge the changes. Please review the attached document and confirm your understanding by end of week.',
    time: '4 days ago',
    priority: 'medium',
    type: 'policy-update'
  },

  // Document-related emails
  {
    id: 'email-6',
    category: 'documents',
    sender: 'John Smith',
    subject: 'Stale Project Documentation',
    content: 'I noticed several project documents haven\'t been updated in over 90 days. Can you please review and update the following files: Project Requirements.docx, Technical Specifications.pdf, and User Manual.docx?',
    time: '1 day ago',
    priority: 'medium',
    type: 'document-update'
  },
  {
    id: 'email-7',
    category: 'documents',
    sender: 'Anna Rodriguez',
    subject: 'Archive Old Documents',
    content: 'As part of our quarterly cleanup, we need to archive documents that are no longer active. Please review your shared folders and mark documents for archival or deletion.',
    time: '2 days ago',
    priority: 'low',
    type: 'document-cleanup'
  },

  // Security-related emails
  {
    id: 'email-8',
    category: 'security',
    sender: 'IT Security Team',
    subject: 'Suspicious Login Activity Detected',
    content: 'We\'ve detected unusual login activity on your account from an unrecognized device. Please verify this was you and update your password immediately. If this wasn\'t you, please contact IT security right away.',
    time: '1 hour ago',
    priority: 'high',
    type: 'security-alert'
  },
  {
    id: 'email-9',
    category: 'security',
    sender: 'Security Admin',
    subject: 'Large File Transfer Alert',
    content: 'A large file transfer (2.5GB) was initiated from your account to an external email address. Please confirm this transfer was authorized and provide justification for the data export.',
    time: '6 hours ago',
    priority: 'high',
    type: 'file-transfer-alert'
  },

  // Meeting-related emails
  {
    id: 'email-10',
    category: 'meetings',
    sender: 'Calendar System',
    subject: 'Meeting Overload Alert',
    content: 'You have 7 hours of meetings scheduled for today, which exceeds the recommended 5-hour limit. Consider rescheduling some meetings to maintain productivity and work-life balance.',
    time: '30 minutes ago',
    priority: 'medium',
    type: 'meeting-overload'
  },
  {
    id: 'email-11',
    category: 'meetings',
    sender: 'Productivity Assistant',
    subject: 'Back-to-Back Meeting Warning',
    content: 'You have 4 consecutive meetings scheduled without breaks. Research shows this can reduce meeting effectiveness. Would you like suggestions for optimizing your schedule?',
    time: '2 hours ago',
    priority: 'low',
    type: 'meeting-optimization'
  }
];