import React, { useState } from "react"
import Link from 'next/link'
import classNames from 'classnames'
import styles from './proposal-new.module.css'

const createProposal = async (text) => {
    try {
        const res = await fetch('/api/proposal', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text
            }),
        })
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
            throw new Error(res.status)
        }
        console.log(res)
        return('Success to create message')
    } catch (error) {
        console.log(error)
        return('Failed to create message')
    }
}

const Main = () => {
  return (
    <div className={styles.flex}>
          <h1>hhihihihi</h1>
    </div>
  )
}


export default function ProposalNew() {
    const [textValue, setTextValue] = useState('')

    return (
        <div className={styles.all_layout}>
        <Main />
        <div className={classNames(styles.centerize_items, styles.flex)}>
            <textarea onChange={(event) => setTextValue(event.target.value)}/>
            <button onClick={() => createProposal(textValue)}>Criar proposta</button>
            <Link href='/'>Voltar para home</Link>
        </div>
        </div>
    );
}
