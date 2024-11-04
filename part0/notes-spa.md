sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes a note and clicks "Save"

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Acknowledgement of successful save
    deactivate server

    Note right of browser: JavaScript updates the notes list without reloading the page by adding the new note to the local data and re-rendering the UI
