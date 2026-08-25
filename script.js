document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ========================= */
        /* DARK MODE */
        /* ========================= */

        const darkModeBtn =
            document.getElementById(
                "darkModeBtn"
            );


        if (darkModeBtn) {


            if (
                localStorage.getItem(
                    "darkMode"
                ) === "enabled"
            ) {

                document.body.classList.add(
                    "dark"
                );

                darkModeBtn.textContent =
                    "☀️";
            }


            darkModeBtn.addEventListener(
                "click",
                function () {

                    document.body.classList.toggle(
                        "dark"
                    );


                    if (
                        document.body.classList.contains(
                            "dark"
                        )
                    ) {

                        darkModeBtn.textContent =
                            "☀️";

                        localStorage.setItem(
                            "darkMode",
                            "enabled"
                        );

                    } else {

                        darkModeBtn.textContent =
                            "🌙";

                        localStorage.setItem(
                            "darkMode",
                            "disabled"
                        );

                    }

                }
            );

        }



        /* ========================= */
        /* TYPING EFFECT */
        /* ========================= */

        const typing =
            document.getElementById(
                "typing"
            );


        if (typing) {


            const words = [

                "Computer Engineering Student",

                "Future Software Engineer",

                "Web Developer",

                "Arduino Enthusiast"

            ];


            let wordIndex = 0;

            let letterIndex = 0;

            let deleting = false;


            function typeEffect() {


                const currentWord =
                    words[wordIndex];


                if (!deleting) {


                    typing.textContent =
                        currentWord.substring(
                            0,
                            letterIndex + 1
                        );


                    letterIndex++;


                    if (
                        letterIndex ===
                        currentWord.length
                    ) {

                        deleting = true;


                        setTimeout(
                            typeEffect,
                            1500
                        );


                        return;
                    }


                } else {


                    typing.textContent =
                        currentWord.substring(
                            0,
                            letterIndex - 1
                        );


                    letterIndex--;


                    if (
                        letterIndex === 0
                    ) {


                        deleting = false;

                        wordIndex++;


                        if (
                            wordIndex >=
                            words.length
                        ) {

                            wordIndex = 0;
                        }

                    }

                }


                setTimeout(
                    typeEffect,
                    deleting
                        ? 50
                        : 100
                );

            }


            typeEffect();

        }



        /* ========================= */
        /* SCROLL REVEAL */
        /* ========================= */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        function revealOnScroll() {


            revealElements.forEach(
                function (element) {


                    const position =
                        element
                            .getBoundingClientRect()
                            .top;


                    const screenHeight =
                        window.innerHeight;


                    if (
                        position <
                        screenHeight - 80
                    ) {

                        element.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        window.addEventListener(
            "scroll",
            revealOnScroll
        );


        revealOnScroll();



        /* ========================= */
        /* CARD CLICK EFFECT */
        /* ========================= */

        const cards =
            document.querySelectorAll(
                ".card"
            );


        cards.forEach(
            function (card) {


                card.addEventListener(
                    "click",
                    function () {


                        card.classList.remove(
                            "card-click"
                        );


                        void card.offsetWidth;


                        card.classList.add(
                            "card-click"
                        );


                        setTimeout(
                            function () {

                                card.classList.remove(
                                    "card-click"
                                );

                            },
                            180
                        );

                    }
                );

            }
        );



        /* ========================= */
        /* NAVIGATION */
        /* ========================= */

        const navLinks =
            Array.from(
                document.querySelectorAll(
                    'nav a[href^="#"]'
                )
            ).filter(
                function (link) {

                    return document.querySelector(
                        link.getAttribute(
                            "href"
                        )
                    );

                }
            );


        const sections =
            Array.from(
                document.querySelectorAll(
                    "section[id]"
                )
            );


        let isNavScrolling =
            false;


        let navScrollTimer =
            null;



        /* ========================= */
        /* ACTIVE NAV */
        /* ========================= */

        function setActiveNav(id) {


            navLinks.forEach(
                function (link) {


                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute(
                            "href"
                        ) ===
                        `#${id}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }



        /* ========================= */
        /* SCROLL NAV */
        /* ========================= */

        function updateActiveNavOnScroll() {


            if (isNavScrolling) {

                return;
            }


            const marker =
                window.scrollY +
                (
                    window.innerHeight *
                    0.35
                );


            let currentSection =
                sections[0];


            sections.forEach(
                function (section) {


                    if (
                        section.offsetTop <=
                        marker
                    ) {

                        currentSection =
                            section;

                    }

                }
            );


            if (currentSection) {

                setActiveNav(
                    currentSection.id
                );

            }

        }



        /* ========================= */
        /* NAV CLICK */
        /* ========================= */

        navLinks.forEach(
            function (link) {


                link.addEventListener(
                    "click",
                    function (e) {


                        const targetId =
                            this.getAttribute(
                                "href"
                            );


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {

                            return;
                        }


                        e.preventDefault();


                        const sectionId =
                            targetId.substring(1);


                        /* Activate immediately */

                        setActiveNav(
                            sectionId
                        );


                        /* Lock active-line update */

                        isNavScrolling =
                            true;


                        clearTimeout(
                            navScrollTimer
                        );


                        navScrollTimer =
                            setTimeout(
                                function () {

                                    isNavScrolling =
                                        false;


                                    setActiveNav(
                                        sectionId
                                    );

                                },
                                900
                            );


                        /* Animation */

                        target.classList.remove(
                            "section-focus"
                        );


                        void target.offsetWidth;


                        target.classList.add(
                            "section-focus"
                        );


                        /* Smooth scroll */

                        target.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "center"

                        });


                        setTimeout(
                            function () {

                                target.classList.remove(
                                    "section-focus"
                                );

                            },
                            900
                        );

                    }
                );

            }
        );



        /* ========================= */
        /* SCROLL EVENT */
        /* ========================= */

        let navScrollTicking =
            false;


        window.addEventListener(
            "scroll",
            function () {


                if (
                    !navScrollTicking
                ) {


                    window.requestAnimationFrame(
                        function () {


                            updateActiveNavOnScroll();


                            navScrollTicking =
                                false;

                        }
                    );


                    navScrollTicking =
                        true;

                }

            },
            {
                passive: true
            }
        );



        /* ========================= */
        /* RESIZE */
        /* ========================= */

        window.addEventListener(
            "resize",
            function () {

                updateActiveNavOnScroll();

            }
        );



        /* ========================= */
        /* INITIAL */
        /* ========================= */

        updateActiveNavOnScroll();

    }
);
