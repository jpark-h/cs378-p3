import React from "react";
import { fetchGenData } from './apiCalls';
import { useState } from "react";
import { Button, ButtonGroup, Card, Row, Col, Form } from "react-bootstrap";
import { useEffect } from "react";

function Home() {

    const [gen, setGen] = useState(1)
    const [pokeList, setPokeList] = useState([])
    const [search, setSearch] = useState("")
    const [genList, setGenList] = useState([])

    useEffect(() => {
        loadGen(gen, setGen)
    }, [gen]);

    useEffect(() => {
        filterSearch(search)
    }, [search])

    function filterSearch(param) {
        const filtered = genList.filter(pokemon => (pokemon.name).includes(param))
        console.log(filtered)
        setSearch(param)
        setPokeList(filtered)
    }

    async function loadGen(genn, setGen) {
        const temp = await fetchGenData(genn)
        setPokeList(temp)
        setGenList(temp)
        setGen(genn)
    }
    function capitalizeString(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    function formatAbilities(abilities) {
        let formatted = capitalizeString(abilities[0])
        for (let i = 1; i < abilities.length; i++) {
            formatted += " / " + capitalizeString(abilities[i])
        }
        return formatted
    }
    return (
        <>
            <h1>Pokemon Gens I-III</h1>
            <ButtonGroup className="pb-3" aria-label="Basic example">
                <Button variant="outline-primary" active={gen === 1} onClick={() => { loadGen(1, setGen) }}>Gen I</Button>
                <Button variant="outline-primary" active={gen === 2} onClick={() => { loadGen(2, setGen) }}>Gen II</Button>
                <Button variant="outline-primary" active={gen === 3} onClick={() => { loadGen(3, setGen) }}>Gen III</Button>
            </ButtonGroup>
            <Form>
                <Form.Group className="m-4" controlId="exampleForm.ControlInput1">
                    <Form.Label>Search By Name for Gen</Form.Label>
                    <Form.Control placeholder="search pokemon name" onChange={ e => filterSearch(e.target.value)} />
                </Form.Group>
            </Form>
            <Row className="g-3 justify-content-center" xs='auto'>
                {
                    pokeList.map(pokemon => {
                        return (
                            <Col>
                                <Card style={{ width: '18rem', height: '27rem' }}>
                                    <Card.Img variant="top" src={pokemon.sprite} />
                                    <Card.Body>
                                        <Card.Title>{(pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1)}</Card.Title>
                                        <Row className="justify-content-center">
                                            {
                                                pokemon.types.map(type => {
                                                    return (
                                                        <Col>
                                                            <div className={"type " + type}>{type.toUpperCase()}</div>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                        <Card.Text className="pb-3">
                                            <strong>Abilities:</strong> {formatAbilities(pokemon.abilities)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default Home;