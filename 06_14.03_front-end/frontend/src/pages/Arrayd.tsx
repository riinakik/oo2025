

function Arrayd() {

    const sonad = ["Elas", "metsas", "mutionu"]
  const autod = [
    {"mark": "BMW", "mudel": "15", "year": 2015 },
    {"mark": "Audi", "mudel": "TT", "year": 2012 },
    {"mark": "Mercedes", "mudel": "S", "year": 2018 },
    {"mark": "VW", "mudel": "15", "year": 2020 }
  ]

  return (
    <div>
    {/* <div>{7+7}</div>
    <div>7+7</div>
    <div>{kogus}</div>
    <div>{count}</div> */}
    {sonad.map(sona => 
     <div key={sona}>
      {sona}
     </div> )}
    <br />
    {autod.map(auto => 
     <div key={auto.mark+auto.mudel}>
      {auto.mark} - {auto.mudel} ({auto.year})
    </div> )}
      <br />
    </div>
  )
}

export default Arrayd