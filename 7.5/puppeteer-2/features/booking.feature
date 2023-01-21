Feature: Book a ticket

    Scenario: Book a ticket at first availavble time
        Given user is on the start page
        When user select the first available time
        And user select the first not taken chair 
        And user push booking button
        Then user is on the payment page