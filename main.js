$(document).ready(function () {
    const WORDS_EASY = [
        { word: "Sun", trans: "Сонце" },
        { word: "Water", trans: "Вода" },
        { word: "Book", trans: "Книга" },
        { word: "Tree", trans: "Дерево" },
        { word: "Bird", trans: "Птах" }
    ];

    const WORDS_MEDIUM = [
        { word: "Smile", trans: "Посмішка" },
        { word: "Chair", trans: "Стілець" },
        { word: "Road", trans: "Дорога" },
        { word: "Window", trans: "Вікно" },
        { word: "Music", trans: "Музика" }
    ];

    const WORDS_HARD = [
        { word: "Knowledge", trans: "Знання" },
        { word: "Decision", trans: "Рішення" },
        { word: "Freedom", trans: "Свобода" },
        { word: "Responsibility", trans: "Відповідальність" },
        { word: "Creativity", trans: "Креативність" }
    ];

    let currentWords = WORDS_EASY;
    let count = 0;
    let correct = 0;
    let wrong = 0;
    let index = null;

    $("#level").on("change", function () {
        const level = $(this).val();
        if (level === "easy") currentWords = WORDS_EASY;
        else if (level === "medium") currentWords = WORDS_MEDIUM;
        else if (level === "hard") currentWords = WORDS_HARD;

        count = 0;
        correct = 0;
        wrong = 0;
        index = null;
        $(".card p").text("");
        $(".cou").text("0/10");
        $(".correct").text("Вірно");
        $(".wrong").text("Невірно");
        $(".okno").hide();
        $("#answer").val("");
        $(".error").text("");
    });

    function showNextWord() {
        if (count >= 10) return;

        index = Math.floor(Math.random() * currentWords.length);
        $(".card p").text(currentWords[index].word);
        count++;
        $(".cou").text(`${count}/10`);
        $("#answer").val("");
        $(".error").text("");
    }

    $(".nav p:last-child").on("click", function () {
        showNextWord();
    });

    $(".button").on("click", function () {
        if (index === null) {
            $(".error").text("Спочатку натисніть → для початку");
            return;
        }

        let answer = $("#answer").val().trim().toLowerCase();
        if (answer === "") {
            $(".error").text("Введіть відповідь");
            return;
        }

        $(".error").text("");

        if (answer === currentWords[index].trans.toLowerCase()) {
            correct++;
        } else {
            wrong++;
        }

        $(".correct").text(`Вірно: ${correct}`);
        $(".wrong").text(`Невірно: ${wrong}`);

        if (count >= 10) {
            let resultText = "";
            if (correct < 5) {
                resultText = "Поганий рівень";
            } else if (correct < 9) {
                resultText = "Задовільний рівень";
            } else {
                resultText = "Високий рівень";
            }

            $(".okno .info").text(resultText);
            $(".okno").fadeIn(300);
        }
    });
});
