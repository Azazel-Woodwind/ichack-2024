import { useState } from "react";
import styled from "styled-components";

// Create a specific date and time
const date = new Date("2024-12-13T03:00:00");

// Use Intl.DateTimeFormat to format the date
const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
});

// Format the date
const formattedDate = dateFormatter.format(date);

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
                <h3> {formattedDate} </h3>

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
import { useRef, useEffect } from "react";

const TestSVG = `
<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/svg"><svg viewBox="0 0 300 300" xmlns="http://www.w3.org/svg"><text x="20" y="20">London</text>
<line x1="50" y1="250" x2="250" y2="250" stroke="black"></line>
<line x1="70" y1="250" x2="70" y2="50" stroke="black"></line>
<text x="55" y="260">Mon</text>
<text x="85" y="260">Tue</text>
<text x="115" y="260">Wed</text>
<text x="145" y="260">Thu</text>
<text x="175" y="260">Fri</text>
<text x="205" y="260">Sat</text>
<text x="235" y="260">Sun</text>
<circle cx="70" cy="200" r="5" fill="none" stroke="black"></circle>
<circle cx="100" cy="180" r="5" fill="none" stroke="black"></circle>
<circle cx="130" cy="150" r="5" fill="none" stroke="black"></circle>
<circle cx="160" cy="120" r="5" fill="none" stroke="black"></circle>
<circle cx="190" cy="140" r="5" fill="none" stroke="black"></circle>
<circle cx="220" cy="160" r="5" fill="none" stroke="black"></circle>
<circle cx="250" cy="190" r="5" fill="none" stroke="black"></circle>
<line x1="70" y1="200" x2="100" y2="180" stroke="black"></line>
<line x1="100" y1="180" x2="130" y2="150" stroke="black"></line>
<line x1="130" y1="150" x2="160" y2="120" stroke="black"></line>
<line x1="160" y1="120" x2="190" y2="140" stroke="black"></line>
<line x1="190" y1="140" x2="220" y2="160" stroke="black"></line>
<line x1="220" y1="160" x2="250" y2="190" stroke="black"></line>
<text x="65" y="210">15</text>
<text x="95" y="190">17</text>
<text x="125" y="160">20</text>
<text x="155" y="130">23</text>
<text x="185" y="150">21</text>
<text x="215" y="170">19</text>
<text x="245" y="200">16</text>
</svg></svg>
`;
const SVGContainer = styled.div`
    max-width: 450px;
    font-size: 0.8rem;
    font-weight: 400px;
    border: 1px solid #f3f3f3;
`;
const QuestionSVG = ({ svgCode }) => {
    return <SVGContainer dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

const Question = ({ question, index }) => {
    return (
        <QuestionContainer key={index}>
            <LeftRight>
                <h5>
                    {index + 1}. {question.question}
                </h5>
                <span>{question.marks}</span>
            </LeftRight>
            {question.svgCode ? (
                <QuestionSVG
                    svgCode={question.svgCode ? question.svgCode : null}
                />
            ) : null}
            {question.choices ? (
                <div>
                    {question.choices?.map((choice, index) => {
                        return (
                            <MultipleChoice>
                                {" "}
                                {INDEX_MAP[index]}) {choice}{" "}
                            </MultipleChoice>
                        );
                    })}
                </div>
            ) : (
                //@ts-ignore
                <DotPattern marks={question.marks - 1} />
            )}
        </QuestionContainer>
    );
};

const DotPattern = styled.div`
    width: 90%;
    height: ${props => props.marks * 80}px;
    background-image: radial-gradient(circle, #000 1px, transparent 1px);
    background-size: 10px 40px;
`;

import data from "./data.js";

function App() {
    const [questions, setQuestions] = useState(null);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const questionsParam = params.get("questions");
        if (questionsParam) {
            try {
                // Decode and parse the questions from the URL
                const decodedQuestions = decodeURIComponent(questionsParam);
                const parsedQuestions = JSON.parse(decodedQuestions);
                setQuestions(parsedQuestions);
            } catch (error) {
                console.error("Error parsing questions from URL:", error);
                setQuestions(null);
            }
        } else {
            console.error(
                "REVERTING TO TEST DATA DUE TO INVALID DATA RECEIVED",
                window.location.search
            );
            setQuestions(data);
        }
    }, []);

    console.log(questions);
    const [measure, setMeasure] = useState(true);
    const [pages, setPages] = useState([]);
    const questionsRef = useRef([]);

    useEffect(() => {
        if (!measure) return; // Skip if not in measurement phase

        // Wait for the next paint to ensure all questions are rendered
        requestAnimationFrame(() => {
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
                newPages[currentPage].push(questions[index]);
                currentHeight += questionHeight;
            });

            setPages(newPages);
            setMeasure(false); // End measurement phase
        });
    }, [measure, questions]);

    if (!questions) {
        return <div>Loading questions...</div>;
    }

    let qIndex = -1;
    return (
        <Container>
            <UpperSection questions={questions} />
            {measure ? (
                <div
                    style={{
                        position: "absolute",
                        left: "-10000px",
                        top: "-10000px",
                    }}>
                    {questions.map((question, index) => (
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
    margin: 0.5rem 0; // adjust spacing around text
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
