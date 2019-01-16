
import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import ButtonToggle, { Props, State } from "./ButtonToggle"

describe(`${ButtonToggle.name}`, () => {
    let tree: ShallowWrapper<Props, State>

    const createTree = (props: Props) => {
        tree = shallow(<ButtonToggle {...props}/>)
    }

    describe(`properties`, () => {
        beforeEach(() => {
            createTree({ onClick: () => {} })
        })

        it(``, () => {
            expect(tree.prop("text")).toEqual("")
        })
    })
})