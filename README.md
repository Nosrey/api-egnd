# api/
## /users/:id - GET
```
Devuelve toda la informacion del usuarios de los formularios a medidas que se van completando
```
## /signup - POST
```
{
	"mail":"",
	"password":"",
	"businessName":"",
	"businessInfo":[
    {"businessModel":"",
    "currency":""}
    ]
}
```

## /signin - POST
```{
	"mail":"",
	"password":"",
	
	}
## /assumpventa - POST
```
{
    canales: [],
    churns: [],
    paises:[],
    productos: [],
    idUser: "",
}
```

## /volumen - POST
```
{
    volumen: [{
        country: "",
        canal: "",
        year: "",
        product: [{
            id: "",
            nameProduct:"",
            months: []
        }]
    }],
    idUser: ""
}
```

## /bienes - POST
```
{
    bienes: [{
        year: "",
        bien: [{
            name: "",
            detail: "",
            unidad: "",
            price: "",
            months: []
        }],
        
    }],
    idUser: ""
}
```

## /costo - POST
```
{
    costo: [{
        pais: "",
        canal: "",
        year: "",
        producto: [{
            id: "",
            product: "",
            months: []

        }],
        extra: [{
            name: "",
            percentage: "",
            months: []
        }]
    }],
    idUser: "",
}
```

## /gastos - POST
```
{
     gastos: [{
        rubro: "",
        year: "",
        num: "",
        numAcc: "",
        contableAcc: "",
        puesto: [{
            name: "",
            months: []
        }]
    }],
    idUser: [],
}
```

## /precio - POST
```
{
     precio: [{
        pais: "",
        canal: "",
        year: "",
        producto: [{
            id: "",
            product: "",
            months: []

        }]
    }],
    idUser: "",
}
```

## /puestosq - POST
```
{
    puestosq: [{
        rubro: "",
        year: "",
        puesto: [{
            name: "",
            months: []
        }]
    }],
    idUser: "",
}
```

## /puestosv - POST
```
{
    puestosv: [{
        rubro: "",
        year: "",
        puesto: [{
            name: "",
            months: []
        }]
    }],
    idUser: "",
}
```


##  /assumpfinanciera - POST
``
```
{
   
	cobranzas: {},
	pagoProducto:  {}
	pagoServicio:  {}
	stock:'',
	inversion:  {}
        idUser: "",
}
```

