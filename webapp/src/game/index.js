import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CoronaBusters from '../components/CoronaBusters'
import React, { Fragment, useState } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export const Game = () => {
  const [highScore, setHighScore] = useState(0)

  const handleNewScore = score => {
    if (score > highScore) {
      setHighScore(score)
    }
  }

  return (
    <Fragment>
      <Stack alignItems='center' justifyContent='center'>
        <Typography component='h1' sx={{ mb: 2 }} variant='h4'>Corona Busters</Typography>
        <CoronaBusters onNewScore={handleNewScore} />
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Stack alignItems='center' justifyContent='center'>
              <Typography sx={{ mb: 2 }} variant='h6'>High Score: {highScore}</Typography>
              <Typography>Movement: WASD or Arrow Keys</Typography>
              <Typography>Fire: Spacebar</Typography>
              <Typography>Press Spacebar to start</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Fragment>
  )
}
