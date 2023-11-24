describe('Issue deletion', () => {
    beforeEach(() => {
         cy.visit('/');
         cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
           cy.visit(url + '/board');
           cy.contains('This is an issue of type: Task.').click();
         });
       });
   
   //Issue should be deleted successfully
   it('Test case 1: Issue Deletion', () => {
   
   //Confirm issue window is visible      
   cy.get('[data-testid="modal:issue-details"]').should('be.visible');
   
   //Clicking the trash button for deletion
   cy.get('[data-testid="icon:trash"]').click();
   
   //Conformation page opens and then initiate deletion of the issue
   cy.get('[data-testid="modal:confirm"]').should('be.visible');
   cy.get('[data-testid="modal:confirm"]').within(() => {
   cy.contains('Are you sure you want to delete this issue?').should('be.visible');
   cy.contains("Once you delete, it's gone for good").should('be.visible');
   cy.contains('Delete issue').click();
   
   //Issue is deleted and doesn't exist anymore
   cy.get('[data-testid="modal:confirm"]').should('not.exist');
   
   //Assert that the issue is deleted and no longer displayed on the Kanban board
   cy.reload();
   cy.contains('This is an issue of type: Task.').should('not.exist');
    });
   });
   
   //Initiating the issue deletion process and then canceling it
   it('Test case 2: Issue Deletion Cancellation', () => {
   
   //Confirm issue window is visible
   cy.get('[data-testid="modal:issue-details"]').should('be.visible');
   
   //Clicking the trash button for deletion
   cy.get('[data-testid="icon:trash"]').click();
   
   //Conformation page opens 
   cy.get('[data-testid="modal:confirm"]').should('be.visible');
   cy.get('[data-testid="modal:confirm"]').within(() => {
   cy.contains('Are you sure you want to delete this issue?').should('be.visible');
   cy.contains("Once you delete, it's gone for good").should('be.visible');
   cy.contains('Cancel').click();
   });
   
   //Redirection to the issue page
   cy.get('[data-testid="modal:confirm"]').should('not.exist');
   cy.get('[data-testid="modal:issue-details"]').should('be.visible');
   cy.get('[data-testid="icon:close"]').first().click();
   cy.get('[data-testid="modal:issue-details"]').should('not.exist');
   
   //Issue is still visible on the Kanban board
   cy.get('[data-testid="board-list:backlog"]').within(() => {
   cy.contains('This is an issue of type: Task.').should('be.visible');
   });
   });
   });