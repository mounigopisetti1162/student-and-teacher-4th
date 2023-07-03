import * as React from 'react';
import Card from '@mui/material/Card';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { CardTitle,CardSubtitle, CardBody } from 'reactstrap';
import Context from './Context';
export default function CardComponent({data,id})
{
  const context=useContext(Context)
    const navigate=useNavigate()
    const {avatar,name,field,division}=data
// const id=id;
// console.log(data._id)
    return(
        <>
        <Card className='card'
       
    >
<CardBody className='cardbody'>
      <img alt="Sample" src={avatar} />
        <CardTitle tag="h5">{name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {field}
        </CardSubtitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {division}
        </CardSubtitle>
    
                <Button
                className='button'
                    color="primary"
                    onClick={() =>
                      navigate(`/action/${data._id}`, {
                        state: { isView: false }
                      })
                    }
                  >
                    Update
                  </Button>
                  <Button
                  className='button'
                    color="warning"
                    onClick={() =>
                      navigate(`/action/${data._id}`, {
                        state: { isView: true }
                      })
                    }
                  >
                  View
                  </Button>
<Button color="error"
className='button'
                    onClick={() => context.deleted(data._id)}
                    > Delete</Button>
               

</CardBody>
</Card>
</>
    )
}