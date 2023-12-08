const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
const getEstimate = () => cy.get('input[placeholder="Number"]');
const getTimeTracker = () => cy.get('[data-testid = "icon:stopwatch"]');
const getSpendTime = () => cy.get('input[placeholder = "Number"]')
const getTimeTrackersModal = () => cy.get('[data-testid="modal:tracking"]');
const estimateTime = 15;
const spendTime = 10;
const editSpendTime = 3;
const loggedRem = 5
const editSpendTimeLeft = 12
const logged = ('10h logged')
const editLogged = ('3h logged')
const remaining = ('15h estimated')
const loggedRemaining = ('5h remaining')
const editLoggedRemaining = ('12h remaining')
const noTimeLogged = ('No time logged')

describe('Issue creating, editing estimate, validating timetracker', () => {
    visitBoardAndOpenSpecificIssue()
    
    it('Should add/edit/clear estimation in the task.', () => {        

        getIssueDetailsModal()
            getEstimate()
                .type(estimateTime)
            cy.contains(remaining).should('be.visible')
            getTimeTracker()
                .click();
            
            getTimeTrackersModal()
            getSpendTime()
                    .eq(1)
                    .type(spendTime);
            getTimeTrackersModal()
                    .find('button').children()
                    .click();
            cy.contains(logged).should('be.visible')
            cy.contains(remaining).should('be.visible')

            getIssueDetailsModal()
                getTimeTracker()
                    .click();
                getTimeTrackersModal()
                getSpendTime()
                    .eq(1)
                    .clear()
                    .type(editSpendTime)
                getTimeTrackersModal()
                    .find('button').children()
                    .click();
                cy.contains(editLogged).should('be.visible')
                cy.contains(remaining).should('be.visible')
            getEstimate()
                .clear()
                cy.contains(editLogged).should('be.visible')
                cy.contains(remaining).should('not.exist')
    });

    it('Should validate timetracker functionality.', () => { 
        getIssueDetailsModal()
            getEstimate()
                .type(estimateTime)
            cy.contains(remaining).should('be.visible')
 
            getTimeTracker()
                .click();       
            getTimeTrackersModal()
            getSpendTime()
                .eq(1)
                .type(spendTime)
            getSpendTime()
                .eq(2)
                .type(loggedRem)
            getTimeTrackersModal()
                .find('button').children()
                .click();
            cy.contains(logged).should('be.visible')
            cy.contains(loggedRemaining).should('be.visible')

            getIssueDetailsModal()
                getTimeTracker()
                    .click();
            getTimeTrackersModal()
                getSpendTime()
                    .eq(1)
                    .clear()
                    .type(editSpendTime)
                getSpendTime()
                    .eq(2)
                    .clear()
                    .type(editSpendTimeLeft)
            getTimeTrackersModal()
                .find('button').children()
                .click();
            cy.contains(editLogged).should('be.visible')
            cy.contains(editLoggedRemaining).should('be.visible')

            getIssueDetailsModal()
                getTimeTracker()
                    .click();
            getTimeTrackersModal()
                getSpendTime()
                    .eq(1)
                    .clear()
                getSpendTime()
                    .eq(2)
                    .clear()
            getTimeTrackersModal()
                .find('button').children()
                .click();
            cy.contains(noTimeLogged).should('be.visible')
            cy.contains(remaining).should('be.visible')
            cy.screenshot('Full page screenshot')
    });
});

function visitBoardAndOpenSpecificIssue() {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        //System will already open issue creating modal in beforeEach block  
        cy.visit(url + '/board?modal-issue-create=true');
        letsCreateNewIssue('TEST_TITLE')
        });
      });
}

function letsCreateNewIssue(title) {
    cy.get('[data-testid="select:type"]').click();
    cy.get('[data-testid="select-option:Story"]')
      .trigger('click');
    cy.get('.ql-editor').type('TEST_DESCRIPTION');
    cy.get('input[name="title"]').type(title);
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="icon:close"]').click();
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="select-option:Lord Gaben"]').click();
    cy.get('button[type="submit"]').click();  
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]').contains(title).click();
    });
  } 