import { images } from '../constants'
import { Item } from '../models'

export const items = [
    new Item(
        1,
        "Okra",
        "भिंडी",
        images.okra,
        "vegetable",
        "KG",
        0.5
    ),
    new Item(
        2,
        "Spinach",
        "पालक",
        images.spinach,
        "vegetable",
        "KG",
        0.5,
    ),
    new Item(
        3,
        "Bottle Gourd",
        "लौकी",
        images.lauki,
        "vegetable",
        "KG",
        0.5
    ),
    new Item(
        4,
        "Green Chillies",
        "हरी मिर्च",
        images.green_chillies,
        "vegetable",
        "Gm",
        50,
    ),
    new Item(
        6,
        "Bananas",
        "केले",
        images.bananas,
        "fruit",
        "pc",
        6,
    ),
    new Item(
        7,
        "Apples - Washington",
        "सेब - वाशिंगटन",
        images.apple_washington,
        "KG",
        0.5,
    )
]
