import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styled from "styled-components";
import "./index.css";
const m = answers.reduce((a, curr) => a + curr.marks, 0);
console.log(m);

// Create a specific date
const date = new Date("2024-12-13T03:00:00");

// Use Intl.DateTimeFormat to format the date without the time
const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
});

// Format the date
const formattedDate = dateFormatter.format(date);

console.log(formattedDate); // This will output: "December 13, 2024"

const Page = styled.div`
    width: 100%;
`;

const UpperPage = styled.div`
    width: 100%;
    min-height: 200vh;
`;

const UpperSection = ({ questions }) => {
    const m = questions.reduce((a, curr) => a + curr.marks, 0);

    return (
        <UpperPage>
            <PageLine />
            <LeftRight>
                <p>X800/77/11</p>
                <h2> Lorem Ipsum et </h2>
            </LeftRight>
            <PageLine />
            <LeftText>
                <b>
                    <p>Total Marks: {m}</p>
                </b>
                <Spacer />
                <h3> {formattedDate} 11:03AM </h3>

                <Wrapper>
                    <RegularText>Total marks - {m}</RegularText>

                    <RegularTextBold>Attempt ALL questions. </RegularTextBold>

                    <RegularText>You may use a calculator.</RegularText>
                    <RegularText>
                        You must show your working fully and label it clearly.
                        You will receive no marks for any incorrect figures not
                        supported by working.
                    </RegularText>
                    <RegularText>
                        Write your answers clearly in the answer booklet
                        provided. In the answer booklet you must clearly
                        identify the question number you are attempting.
                    </RegularText>
                    <RegularText>
                        Use <b>blue</b> or <b>black</b> ink.
                    </RegularText>
                    <RegularText>
                        Before leaving the examination room you must give your
                        answer booklet to the Invigilator; if you do not, you
                        may lose all the marks for this paper.
                    </RegularText>
                </Wrapper>

                <PageLine />
            </LeftText>
        </UpperPage>
    );
};

const INDEX_MAP = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
import { useRef, useEffect, useLayoutEffect } from "react";

const Question = ({ question, index }) => {
    return (
        <QuestionContainer key={index}>
            <LeftRight>
                <h5>
                    {index + 1}. {question.question}
                </h5>
                <span>{question.marks}</span>
            </LeftRight>
            <div> Answer: {question.answer}</div>
        </QuestionContainer>
    );
};
//@ts-ignore
const DotPattern = styled.div`
    width: 90%;
    height: ${props => {
        //@ts-ignore;
        return props.marks * 80;
    }}px;
    background-image: radial-gradient(circle, #000 1px, transparent 1px);
    background-size: 10px 40px;
`;

function App({ questions }) {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const questionsParam = params.get("questions");
        if (questionsParam) {
            try {
                // Decode and parse the questions from the URL
                const decodedQuestions = decodeURIComponent(questionsParam);
                const parsedQuestions = JSON.parse(decodedQuestions);
                console.log(questions);
                setQuestions(parsedQuestions);
            } catch (error) {
                console.error("Error parsing questions from URL:", error);
                setQuestions(null);
            }
        } else {
            setQuestions(answers);
        }
        answers;
    }, []);

    const [measure, setMeasure] = useState(true);
    const [pages, setPages] = useState([]);
    const questionsRef = useRef([]);

    useEffect(() => {
        if (!measure) return; // Skip if not in measurement phase

        // Wait for the next paint to ensure all questions are rendered
        requestAnimationFrame(() => {
            console.log(questionsRef.current);
            const newPages = [[]];
            let currentPage = 0;
            let currentHeight = 0;

            questionsRef.current.forEach((curRef, index) => {
                if (!curRef) return; // Skip if ref is not assigned

                const questionHeight = curRef.offsetHeight;
                if (currentHeight + questionHeight > window.innerHeight) {
                    currentPage++;
                    newPages[currentPage] = [];
                    currentHeight = 0;
                }
                newPages[currentPage].push(answers[index]);
                currentHeight += questionHeight;
            });

            setPages(newPages);
            setMeasure(false); // End measurement phase
        });
    }, [measure, answers]);
    let qIndex = -1;
    return (
        <Container>
            <UpperSection questions={answers} />
            {measure ? (
                <div
                    style={{
                        position: "absolute",
                        left: "-10000px",
                        top: "-10000px",
                    }}>
                    {answers.map((question, index) => (
                        <div ref={el => (questionsRef.current[index] = el)}>
                            <Question
                                question={question}
                                index={index}
                                key={index}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                pages.map((pageQuestions, pageIndex) => (
                    <Page key={pageIndex}>
                        {pageQuestions.map((question, index) => {
                            qIndex++;
                            return (
                                <Question
                                    index={qIndex}
                                    key={index}
                                    question={question}
                                />
                            );
                        })}
                        <CenterText> Page. {pageIndex + 1} </CenterText>
                        <PageLine />
                    </Page>
                ))
            )}
            <h2> END OF EXAM QUESTIONS </h2>
        </Container>
    );
}

const Wrapper = styled.div`
    margin: 0 auto; // centers the wrapper, adjust the margin as needed
    max-width: 100%; // adjust width as per your layout
`;

const RegularTextBold = styled.p`
    font-weight: bold;
    margin: 1rem 0; // adjust spacing around titles
`;

const RegularText = styled.p`
    margin: 0.7rem 0; // adjust spacing around text
`;

const PageLineTwo = styled.div`
    width: 100%;
    border: 1px solid black;
    margin-top: 2em;
`;

const MultipleChoice = styled.p`
    font-weight: 300;
    font-size: 80%;
`;
const CenterText = styled.h4`
    display: flex;
    justify-content: center;
    text-decoration: italic;
`;

const LeftText = styled.h4`
    text-align: left;
    width: 100%;
    text-decoration: italic;
`;

const EmphasisText = styled.p`
    margin-top: 1.3em;
`;

const LeftRight = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    gap: 1em;
`;
const Spacer = styled.div`
    margin: 5rem;
`;
const PageLine = styled.div`
    width: 100%;
    border: 1px solid black;
    margin-top: 2em;
    margin-bottom: 2em;
`;
const RightInline = styled.h3`
    float: right;
    display: inline-block;
`;
const Container = styled.div`
    font-size: 150%;
    width: 100vw;
    padding: 2em;
    padding-left: 8em;
    padding-right: 8em;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    h1,
    h2,
    h3,
    h4 {
        font-weight: 400;
        text-align: left;
    }

    h3,
    h4,
    h5 {
        font-weight: 300;
    }
`;
const QuestionContainer = styled.div`
    max-width: 1920px;
    width: 100%;
    text-align: left;
    padding-bottom: 0.5rem;
`;
export default App;
