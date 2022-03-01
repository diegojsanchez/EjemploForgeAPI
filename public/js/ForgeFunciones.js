const miSegundaFuncion = () => {
    alert('Hola mundo')
}

const aislarElementosUsuarios = () => {
    viewer.isolate(viewer.getSelection())
}

const search = (texto) => {
    // La función search va a buscar el elemento que en sus parametros tenga la palabra introducida como argumento
    // viewer.search('Floor', dbIds => viewer.select(dbIds)
    viewer.search(
        texto, 
        dbIds => {
            viewer.select(dbIds)
        },
        error => {
            console.error(error)
        },
        ['Type Name']
    )
}

const sumarVolumen = () => {
    viewer.model.getBulkProperties([], ['Volume'], res => {
        var volumen = 0.00
        res.forEach(item => {
            volumen += item.properties[0].displayValue
        })
        alert('El volumen del modelo es: ' + volumen.toFixed(2))
    })
}

const sumarArea = () => {
    viewer.model.getBulkProperties([], ['Area'], res => {
        var area = 0.00
        res.forEach(item => {
            area += item.properties[0].displayValue
        })
        alert('El area del modelo es: ' + area.toFixed(2))
    })
}

const sumarCosas = (parametro) => {
    viewer.model.getBulkProperties(viewer.getSelection(), [parametro], res => {
        var suma = 0.00
        res.forEach(item => {
            suma += item.properties[0].displayValue
        })
        alert('El total del parametro: ' + parametro + ' en el modelo es: ' + suma.toFixed(2))
    })
}

const sumarVolumeDbIds = (dbIds, parametro) => {
    viewer.model.getBulkProperties(dbIds, [parametro], res => {
        var suma = 0.00
        res.forEach(item => {
            suma += item.properties[0].displayValue
        })
        // alert('El total del parametro: ' + parametro + ' en el modelo es: ' + suma.toFixed(2))
        console.log('El total del parametro: ' + parametro + ' en el modelo es: ' + suma.toFixed(2))
    })
}

const datosSeleccion = (dbIds) => {
    viewer.model.getBulkProperties(dbIds, ['Length', 'Volume', 'Area'], res => {
        var longitud = 0.00
        var volumen = 0.00
        var area = 0.00
        res.forEach(item => {
            // cogemos la propiedad de Length del item
            var hasLength = item.properties.find(x => x.displayName === 'Length')
            // si tiene la longitud sumanos su valor a la variable longitud
            if (hasLength !== undefined) {
                longitud += hasLength.displayValue
            }
            // cogemos la propiedad de Volume del item
            var hasVolume = item.properties.find(x => x.displayName === 'Volume')
            // si tiene la longitud sumanos su valor a la variable longitud
            if (hasVolume !== undefined) {
                volumen += hasVolume.displayValue
            }
            // cogemos la propiedad de Area del item
            var hasArea = item.properties.find(x => x.displayName === 'Area')
            // si tiene la longitud sumanos su valor a la variable longitud
            if (hasArea !== undefined) {
                area += hasArea.displayValue
            }           
        })

        // alert('El total del parametro: ' + parametro + ' en el modelo es: ' + suma.toFixed(2))
        // console.log('El total del parametro Longitud es '  + longitud.toFixed(2))
        // console.log('El total del parametro Volumen es '  + volumen.toFixed(2))
        // console.log('El total del parametro Área es '  + area.toFixed(2))

        $('#sumLongitud').text(`${longitud.toFixed(2)} mm`)
        $('#sumVolumen').text(`${volumen.toFixed(2)} m3`)
        $('#sumArea').text(`${area.toFixed(2)} m2`)
    })
}


const pintarSeleccion = () => {
    var isChecked = $('#addPintura').is(':checked')
    if (!isChecked) {
        //Recordar: para despintar todo
        viewer.clearThemingColors()
    }
    var dbIds = viewer.getSelection()
    //Nos aseguramos que el usuario tiene algo seleccionado
    if (dbIds.length > 0) {
        dbIds.forEach(dbId => {
            viewer.setThemingColor(
                dbId,
                new THREE.Vector4(180/255, 190/255, 100/255, 1)
            )
        })
        viewer.clearSelection()
    }
}