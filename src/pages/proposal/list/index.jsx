import React, { useState } from "react"
import Link from 'next/link'
import classNames from 'classnames'
import styles from './proposal-list.module.css'
import Proposal from '../../../models/Proposal'
import dbConnect from '../../../lib/dbConnect'

const ListProposals = ({proposals}) => {
    console.log(proposals)
    return (
        <>
        {
            proposals.map((proposal) => {
                return (
                    <div key={proposal._id}>
                        <h1>{proposal.text}</h1>
                    </div>
                )
            })
        }
        </>
  )
}

export default function ProposalList({ proposals }) {
    const [textValue, setTextValue] = useState('')

    return (
        <div className={styles.all_layout}>
        <ListProposals proposals={proposals}/>
        <div className={classNames(styles.centerize_items, styles.flex)}>
            <Link href='/'>Voltar para home</Link>
        </div>
        </div>
    );
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
    await dbConnect()
  
    /* find all the data in our database */
    const result = await Proposal.find({})
    const proposals = result.map((doc) => {
      const proposal = doc.toObject()
      proposal._id = proposal._id.toString()
      delete proposal['createdAt']
      delete proposal['updatedAt']

      return proposal
    })
    
    return { props: { proposals: proposals } }
  }