import React, { useState } from "react"
import { useRouter } from 'next/router';
import Link from 'next/link'
import classNames from 'classnames'
import styles from './proposal-list.module.css'
import Proposal from '../../../models/Proposal'
import dbConnect from '../../../lib/dbConnect'

const refreshData = (router) => {
    router.replace(router.asPath);
}

const editProposal = async (data) => {
    try {
        const res = await fetch('/api/proposal', {
            method: 'PUT',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
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

const LikeButton = ({id, votes, router}) => {
    const handlerClick = async() => {
        const newYes = votes.yes + 1
        const newTotal = votes.total + 1
        await editProposal({id, votes: {...votes, yes: newYes, total: newTotal}})
        refreshData(router)
    }
    return (
        <span><button onClick={handlerClick}>LIKE</button>: <span>{votes.yes}</span></span>
    )
}


const DeslikeButton = ({id, votes, router}) => {
    const handlerClick = async() => {
        const newNo = votes.no - 1
        const newTotal = votes.total + 1
        await editProposal({id, votes: {...votes, no: newNo, total: newTotal}})
        refreshData(router)
    }
    return (
        <span><button onClick={handlerClick}>DESLIKE</button>: <span>{votes.no}</span></span>
    )
}


const ListProposals = ({proposals, router}) => {
    return (
        <>
        {
            proposals
            .sort((a, b) => b.votes.yes - a.votes.yes)
            .map((proposal) => {
                console.log(proposal.votes.yes)
                return (
                    <div key={proposal._id} className={classNames(styles.flex, styles.space_around)}>
                        <span className={styles.eighty_percent}>{proposal.text}</span>
                        <div className={styles.twenty_percent}>
                            <LikeButton id={proposal._id} votes={proposal.votes} router={router}/>
                            <DeslikeButton id={proposal._id} votes={proposal.votes} router={router}/>
                        </div>
                    </div>
                )
            })
        }
        </>
  )
}

export default function ProposalList({ proposals }) {
    const router = useRouter();
    
    return (
        <div className={styles.all_layout}>
        <ListProposals router={router} proposals={proposals}/>
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