# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts
posted by Facilities on our platform. We're working on a new feature which will
generate reports for our client Facilities containing info on how many hours
each Agent worked in a given quarter by summing up every Shift they worked.
Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning
  all Shifts worked that quarter, including some metadata about the Agent
  assigned to each
- A function `generateReport` is then called with the list of Shifts. It
  converts them into a PDF which can be submitted by the Facility for
  compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal
database id. We'd like to add the ability for Facilities to save their own
custom ids for each Agent they work with and use that id when generating reports
for them.**

Based on the information given, break this ticket down into 2-5 individual
tickets to perform. Provide as much detail for each ticket as you can, including
acceptance criteria, time/effort estimates, and implementation details. Feel
free to make informed guesses about any unknown details - you can't guess
"wrong".

You will be graded on the level of detail in each ticket, the clarity of the
execution plan within and between tickets, and the intelligibility of your
language. You don't need to be a native English speaker, but please proof-read
your work.

## Your Breakdown Here

Story Points Unit reference: 1 to 8. Meaning 1 the least amount Unit of
time/effort and 8 the max amount Unit of time/effort. Ideally a taks with a
story point of 8 should not take more than one day. If so, this could be a

User Story:

1. As a client Facility I want to save my own custom id for each Agent.

Scenario: Add new custom agent id.

1. Given that a facility exists in the database.
2. When the client facility navigates to the new agent page.
3. And enters the new agent information
4. And enters the Custom agent id
5. Then the system creates a new record in the Agent database
6. And displays a "Successfully created agent" message.

Development Tasks Breakdown:

1. Add new custom_id column to Agent database. - sp: 2. - label: backend
   - Implementation Detail: Update Prisma schema add a new custom_id column of ID
   type that

2. Add new custom id to new agent form. - sp: 1. - label: frontend
   - Implementation Detail: Add new form field with "Agent ID" label. Make sure
   this id is required. Update integration test.

User Story: As a client Facility I want to generate a quarter report using the
custom agent id. Scenario: Generate facility report

1. Given the facility client navigates to the admin page
2. When the facility client clicks on the "Generate Quarter Report" button
3. Then the system creates a new PDF report using the custom agent id.

Development Tasks Breakdown:

1. Update getShiftsByFacility function - sp: 2. - label: backend. - Implementation
   Detail: Updated getShiftsByFacility function to get Agent metadata with
   custom_id field to be used when generating a report. Update Unit Tests.

2. Update generateReport function. - sp: 2. - label: backend. - Implementation
   Detail: Update function to use custom_id Agent field to get Agent data.
   Update Unit Tests.
