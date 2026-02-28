export function binarySearch3D(sortedArray, target) {
    const steps = []
    let left = 0
    let right = sortedArray.length - 1
    let found = false
    let foundIndex = -1
    let iteration = 0

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        iteration++

        steps.push({
            type: 'check',
            index: mid,
            left,
            right,
            mid,
            lowValue: sortedArray[left],
            midValue: sortedArray[mid],
            highValue: sortedArray[right],
            value: sortedArray[mid],
            found: false,
            iteration,
            comparison: sortedArray[mid] === target ? 'equal' : sortedArray[mid] < target ? 'less' : 'greater'
        })

        if (sortedArray[mid] === target) {
            found = true
            foundIndex = mid
            steps.push({
                type: 'found',
                index: mid,
                value: sortedArray[mid],
                found: true,
                iteration
            })
            break
        } else if (sortedArray[mid] < target) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return {
        steps,
        found,
        foundIndex,
        iterations: iteration
    }
}

export function linearSearch(array, target) {
    const steps = []

    for (let i = 0; i < array.length; i++) {
        steps.push({
            type: 'check',
            index: i,
            value: array[i],
            found: false
        })

        if (array[i] === target) {
            steps.push({
                type: 'found',
                index: i,
                value: array[i],
                found: true
            })
            return {
                steps,
                found: true,
                foundIndex: i,
                iterations: steps.length
            }
        }
    }

    return {
        steps,
        found: false,
        foundIndex: -1,
        iterations: steps.length
    }
}
