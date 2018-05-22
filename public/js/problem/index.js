$(() => {
    $("#submit-login-btn").click(() => $("#login-signup-btn").click());

    const submitForm = $("#submit-form");
    const resultContainer = $("#result-container");
    submitForm.submit(event => {
        event.preventDefault();
        
        const code = $(event.target).find("#code-text-area").val();
        const language = $(event.target).find("#language-select").val();
        
        // Send API Request        
        $.post(window.location.origin + window.location.pathname + "submit", {
            code, language
        }).then(data => {
            showResult(resultContainer, data);
        }).catch(err => {
            console.error(err);
        });
    });
});

const showResult = (resultContainer, { verdict, timeUsed, memoryUsed }) => {
    resultContainer.html("");
    resultContainer.html(`
        <div class="col-sm-12">
            <h3 class="mb-3">Result</h3>
        </div>
        <div class="col-sm-4 mt-3">
            <b>Verdict: </b> ${verdict}
        </div>
        <div class="col-sm-4 mt-3">
            <b>Time Used: </b> ${timeUsed}s
        </div>
        <div class="col-sm-4 mt-3">
            <b>Memory Used: </b> ${memoryUsed}MB
        </div>
    `);
    resultContainer.addClass(`bg-${verdict.toLowerCase()}`);
    resultContainer.show();
}