const VIEWBOX_WIDTH = 600;
const VIEWBOX_HEIGHT = 500;
const STORAGE_KEY = "stillroom-state-v1";
const BUCKET_KEY = "stillroom-vault-v1";
const VAULT_BASE = "https://kvdb.io";

const colours = [
  { name: "Fern", value: "#668b68" }, { name: "Moss", value: "#a7b77b" },
  { name: "Sea glass", value: "#83b6ae" }, { name: "Bluebell", value: "#809cc7" },
  { name: "Lilac", value: "#b49ab8" }, { name: "Rose", value: "#d89089" },
  { name: "Peach", value: "#e8ad82" }, { name: "Sunlight", value: "#e8c86f" },
  { name: "Butter", value: "#f1df9e" }, { name: "Ink", value: "#46514b" }
];

const builtInPages = [
  {
    id: "garden", title: "The slow garden", subtitle: "A few leaves, a little room to breathe.", difficulty: "Gentle", icon: "❋",
    regions: [
      "M280 420 C265 345 274 261 300 157 C310 210 314 295 302 420 Z",
      "M295 317 C254 285 222 277 190 286 C211 323 252 343 297 339 Z",
      "M302 269 C343 229 384 215 419 222 C402 264 359 291 304 292 Z",
      "M292 222 C258 186 225 166 190 164 C203 207 239 236 292 244 Z",
      "M305 190 C337 151 367 131 399 130 C390 169 360 200 306 216 Z",
      "M300 166 C273 132 261 101 268 73 C299 96 312 130 300 166 Z",
      "M124 426 C166 402 199 401 226 420 C195 446 161 452 124 426 Z",
      "M398 427 C426 399 458 391 485 404 C469 438 437 450 398 427 Z",
      "M89 443 C109 428 125 428 139 441 C124 457 106 459 89 443 Z",
      "M461 448 C480 430 498 430 512 443 C499 459 479 462 461 448 Z"
    ]
  },
  {
    id: "sunny-window", title: "A sunny window", subtitle: "A window seat, a plant, and nowhere to be.", difficulty: "Gentle", icon: "☼",
    regions: [
      "M116 82 H484 V420 H116 Z", "M150 112 H282 V250 H150 Z", "M318 112 H450 V250 H318 Z",
      "M150 278 H282 V390 H150 Z", "M318 278 H450 V390 H318 Z",
      "M207 392 C205 341 207 306 221 276 C234 307 235 347 230 392 Z",
      "M217 328 C187 304 171 283 176 260 C202 273 217 294 223 319 Z",
      "M226 313 C247 286 267 273 285 278 C274 303 254 319 228 329 Z",
      "M208 363 C179 344 161 341 146 349 C161 370 183 379 207 377 Z",
      "M352 405 H414 V423 H352 Z", "M358 385 H408 V405 H358 Z"
    ]
  },
  {
    id: "little-house", title: "The little house", subtitle: "A tucked-away cottage with a garden path.", difficulty: "Winding", icon: "⌂",
    regions: [
      "M147 236 L300 110 L453 236 V409 H147 Z", "M114 245 L300 92 L486 245 L464 266 L300 130 L136 266 Z",
      "M183 259 H270 V409 H183 Z", "M206 285 H248 V339 H206 Z", "M318 257 H409 V326 H318 Z",
      "M333 274 H361 V301 H333 Z", "M369 274 H395 V301 H369 Z", "M314 347 H414 V367 H314 Z",
      "M153 428 C198 407 240 406 278 420 C311 432 352 433 403 414 C435 402 460 410 485 430 C454 450 413 455 373 447 C325 437 286 450 244 449 C206 449 177 443 153 428 Z",
      "M88 447 C116 424 137 422 156 435 C141 457 115 464 88 447 Z",
      "M444 450 C466 425 490 420 512 432 C500 458 473 466 444 450 Z"
    ]
  },
  {
    id: "moon-meadow", title: "Moonlit meadow", subtitle: "Tall grasses under a very patient moon.", difficulty: "Winding", icon: "☾",
    regions: [
      "M408 85 A66 66 0 1 1 407 217 A51 51 0 1 0 408 85 Z",
      "M97 150 L110 164 L129 161 L119 178 L126 196 L108 188 L91 200 L94 180 L79 168 L99 167 Z",
      "M225 91 L233 102 L247 101 L239 113 L243 127 L230 121 L218 129 L221 115 L211 106 L225 105 Z",
      "M290 160 L297 169 L309 168 L302 178 L305 190 L294 184 L283 190 L286 178 L278 171 L290 170 Z",
      "M74 428 C145 388 210 396 266 424 C325 454 386 387 525 416 V500 H74 Z",
      "M145 436 C142 360 126 312 103 273 C157 319 176 370 167 431 Z",
      "M179 431 C184 356 210 303 248 267 C228 326 219 379 210 438 Z",
      "M264 433 C252 359 263 299 292 252 C280 319 288 380 293 432 Z",
      "M354 431 C350 354 380 298 420 260 C393 327 396 378 389 433 Z",
      "M446 425 C440 367 457 322 492 293 C471 344 471 383 479 422 Z"
    ]
  },
  {
    id: "flower-market", title: "Flower market", subtitle: "A vase full of wonky, lovely blooms.", difficulty: "Detailed", icon: "✿",
    regions: [
      "M232 310 H370 L352 439 H249 Z", "M232 310 L218 288 H385 L370 310 Z", "M252 347 H360 L356 374 H248 Z",
      "M297 311 C289 255 282 211 253 178 C299 191 319 242 303 311 Z",
      "M307 306 C328 248 361 216 402 207 C385 256 351 290 307 306 Z",
      "M294 296 C262 252 222 237 185 244 C213 282 252 302 294 310 Z",
      "M306 250 C302 221 309 190 326 161 C340 194 333 226 306 250 Z",
      "M250 177 C220 167 206 141 217 116 C237 129 247 150 250 177 Z",
      "M261 172 C267 141 288 126 313 132 C306 153 286 168 261 172 Z",
      "M214 237 C182 229 170 205 181 182 C204 193 215 213 214 237 Z",
      "M186 244 C157 258 131 250 121 227 C144 216 169 223 186 244 Z",
      "M402 207 C408 177 430 160 454 166 C449 190 430 205 402 207 Z",
      "M395 216 C414 191 440 187 458 201 C442 220 418 226 395 216 Z",
      "M326 161 C305 136 310 111 332 96 C345 119 343 143 326 161 Z",
      "M317 164 C331 135 355 126 376 139 C362 160 341 169 317 164 Z"
    ]
  },
  {
    id: "mosaic-garden", title: "Mosaic garden", subtitle: "Small shapes, slow breaths, happy colours.", difficulty: "Detailed", icon: "❀",
    regions: [
      "M300 55 L351 105 L300 155 L249 105 Z", "M300 155 L351 105 L402 155 L351 205 Z", "M300 155 L351 205 L300 255 L249 205 Z", "M300 155 L249 205 L198 155 L249 105 Z",
      "M402 155 L453 105 L504 155 L453 205 Z", "M198 155 L147 105 L96 155 L147 205 Z", "M351 105 L351 43 L402 94 Z", "M249 105 L249 43 L198 94 Z",
      "M351 205 L402 155 L453 205 L402 255 Z", "M249 205 L198 155 L147 205 L198 255 Z",
      "M300 255 L351 205 L402 255 L351 305 Z", "M300 255 L249 205 L198 255 L249 305 Z",
      "M351 305 L402 255 L453 305 L402 355 Z", "M249 305 L198 255 L147 305 L198 355 Z",
      "M300 355 L351 305 L402 355 L351 405 Z", "M300 355 L249 305 L198 355 L249 405 Z",
      "M300 405 L351 405 L326 463 Z", "M249 405 L300 405 L274 463 Z", "M351 405 L402 355 L428 414 Z", "M198 355 L249 405 L172 414 Z",
      "M453 205 L504 155 L522 230 L453 255 Z", "M147 205 L96 155 L78 230 L147 255 Z", "M402 255 L453 205 L478 280 L402 305 Z", "M198 255 L147 205 L122 280 L198 305 Z"
    ]
  },
  {
    id: "starlit-botanical", title: "Starlit botanical", subtitle: "Tiny leaves, dark skies, a little hush.", difficulty: "Gentle", icon: "✦",
    regions: [
      "M75 286 C118 214 136 176 176 121 C224 161 219 224 187 286 Z",
      "M214 293 C245 237 280 201 329 170 C364 212 367 259 341 298 Z",
      "M349 283 C387 228 451 212 499 245 C462 311 393 332 349 283 Z",
      "M151 333 C169 296 183 286 209 274 C217 310 207 349 182 378 Z",
      "M278 355 C304 316 333 302 367 306 C357 355 324 394 282 389 Z",
      "M94 429 C128 401 158 389 170 394 C161 439 126 460 94 429 Z",
      "M443 429 C471 405 499 397 513 404 C496 446 472 460 443 429 Z",
      "M203 116 C226 84 251 63 274 56 C275 97 249 125 203 116 Z",
      "M328 108 C346 80 371 62 387 62 C390 102 370 129 328 108 Z",
      "M255 209 C278 185 300 179 318 186 C303 220 279 234 255 209 Z"
    ]
  },
  {
    id: "cathedral-window", title: "Cathedral window", subtitle: "A calm doorway and a bouquet of glass light.", difficulty: "Winding", icon: "▣",
    regions: [
      "M160 102 H440 V400 H160 Z", "M200 140 H400 V360 H200 Z",
      "M220 162 H280 V255 H220 Z", "M320 162 H380 V255 H320 Z",
      "M220 275 H380 V330 H220 Z", "M244 115 L300 60 L356 115 Z",
      "M133 420 C176 385 205 384 233 428 C195 449 163 449 133 420 Z",
      "M367 420 C394 385 424 382 465 429 C431 450 394 451 367 420 Z",
      "M278 358 C286 324 303 303 320 299 C335 326 331 353 306 368 Z",
      "M207 392 C225 366 244 360 265 374 C248 409 222 416 207 392 Z",
      "M335 392 C352 365 374 359 393 376 C375 411 350 415 335 392 Z"
    ]
  },
  {
    id: "forest-fox", title: "Forest fox", subtitle: "A quiet woodland friend in a soft clearing.", difficulty: "Detailed", icon: "♞",
    regions: [
      "M143 269 C180 218 224 197 270 189 C286 243 261 312 215 355 C182 337 158 315 143 269 Z",
      "M270 193 C332 160 396 167 434 215 C403 282 356 311 308 296 C303 247 289 212 270 193 Z",
      "M223 358 C243 323 279 300 323 298 C333 355 311 402 269 420 C247 410 232 391 223 358 Z",
      "M310 209 C338 194 369 191 396 204 C385 248 347 261 310 250 Z",
      "M200 217 C177 198 151 196 124 201 C137 239 170 254 200 217 Z",
      "M456 220 C474 238 492 252 514 255 C496 287 466 295 456 220 Z",
      "M325 420 C348 440 372 459 391 475 C365 486 337 489 311 480 C319 455 323 440 325 420 Z",
      "M118 430 C149 408 196 410 221 434 C182 459 152 468 118 430 Z",
      "M448 442 C477 420 501 421 514 439 C489 467 462 472 448 442 Z"
    ]
  },
  {
    id: "tea-porch", title: "Tea on the porch", subtitle: "An easy table and a warm cup of sky.", difficulty: "Gentle", icon: "☕",
    regions: [
      "M122 265 H465 V377 H122 Z", "M200 230 H390 V263 H200 Z",
      "M156 218 C170 171 195 141 224 121 C238 169 229 197 201 227 Z",
      "M304 119 C322 151 327 179 321 220 C350 211 369 181 382 141 C362 129 334 123 304 119 Z",
      "M240 387 C268 344 285 338 306 340 C320 399 286 434 244 428 Z",
      "M91 426 C132 406 168 404 193 424 C167 451 127 460 91 426 Z",
      "M395 424 C430 405 463 403 503 422 C465 451 430 461 395 424 Z",
      "M198 275 H400 V300 H198 Z", "M146 332 H452 V349 H146 Z"
    ]
  },
  {
    id: "lake-cabin", title: "Lake cabin", subtitle: "A slow lake and a little cabin on the edge.", difficulty: "Winding", icon: "◫",
    regions: [
      "M140 251 H462 V386 H140 Z", "M203 198 H397 V250 H203 Z",
      "M247 250 H256 V386 H247 Z", "M344 250 H354 V386 H344 Z",
      "M176 294 H425 V322 H176 Z", "M90 392 C148 350 179 342 208 393 C176 414 122 420 90 392 Z",
      "M399 392 C434 351 476 342 511 394 C484 421 432 420 399 392 Z",
      "M91 208 C142 199 171 181 181 151 C205 178 209 217 183 237 C147 245 112 238 91 208 Z",
      "M425 210 C448 181 490 176 514 194 C496 232 457 237 425 210 Z",
      "M237 111 C255 93 275 88 298 95 C285 118 265 131 237 111 Z",
      "M344 108 C362 88 388 86 402 93 C390 121 366 132 344 108 Z"
    ]
  },
  {
    id: "pastel-breeze", title: "Pastel breeze", subtitle: "A soft cloud, a gentle river, a bright afternoon.", difficulty: "Detailed", icon: "❋",
    regions: [
      "M110 321 C162 266 203 272 230 319 C240 359 208 392 155 397 C116 389 90 357 110 321 Z",
      "M228 312 C260 262 317 256 358 305 C356 369 314 398 262 391 C234 366 219 339 228 312 Z",
      "M362 301 C390 264 440 250 489 271 C496 327 467 376 414 382 C394 355 381 331 362 301 Z",
      "M84 435 C141 403 177 401 230 431 C174 468 123 472 84 435 Z",
      "M274 432 C334 386 410 389 484 432 C430 467 372 477 274 432 Z",
      "M229 215 C245 187 269 173 287 179 C279 206 258 225 229 215 Z",
      "M356 207 C373 180 393 170 410 175 C404 203 385 221 356 207 Z",
      "M133 208 C150 180 173 170 186 176 C180 200 164 214 133 208 Z"
    ]
  },
  {
    id: "mini-ocean", title: "Mini ocean", subtitle: "A little dive, a shell, and a slow tide.", difficulty: "Gentle", icon: "≈",
    regions: [
      "M74 285 C124 244 179 236 225 272 C230 312 189 354 137 364 C100 350 80 326 74 285 Z",
      "M228 283 C287 241 349 239 399 279 C390 329 329 370 274 364 C243 344 225 319 228 283 Z",
      "M401 284 C453 247 502 252 527 282 C511 337 456 362 405 348 C392 330 391 302 401 284 Z",
      "M155 394 C190 375 224 374 264 394 C236 432 184 439 155 394 Z",
      "M302 391 C338 370 386 373 420 394 C382 431 336 441 302 391 Z",
      "M258 192 C275 162 298 149 319 160 C313 189 290 209 258 192 Z",
      "M116 160 C131 138 146 130 160 131 C156 150 143 166 116 160 Z",
      "M470 162 C487 144 503 136 516 140 C509 158 492 171 470 162 Z"
    ]
  },
  {
    id: "rainy-branch", title: "Rainy branch", subtitle: "A branch, a few leaves, and a very patient sky.", difficulty: "Detailed", icon: "✧",
    regions: [
      "M120 330 C206 310 264 310 314 333 C308 374 255 420 190 425 C138 417 119 380 120 330 Z",
      "M311 333 C361 310 419 302 479 313 C470 372 418 421 357 425 C323 420 312 382 311 333 Z",
      "M226 124 C242 189 245 250 235 323 C188 307 160 268 172 202 C185 168 197 142 226 124 Z",
      "M298 136 C320 184 326 241 319 318 C361 302 391 268 390 204 C389 174 353 141 298 136 Z",
      "M212 122 C160 96 116 84 93 103 C119 131 156 146 212 122 Z",
      "M320 134 C362 104 414 96 500 120 C448 149 374 156 320 134 Z",
      "M78 437 C109 418 136 412 172 438 C135 462 105 466 78 437 Z",
      "M430 438 C462 413 491 410 518 434 C481 464 456 469 430 438 Z"
    ]
  }
];

const pageArtwork = {
  garden: {
    regions: [
      "M75 430 H525 V466 H75 Z",
      "M215 357 H385 L365 441 H235 Z",
      "M245 338 H355 V358 H245 Z",
      "M294 338 C292 275 296 214 300 155 C310 213 310 277 306 338 Z",
      "M298 242 C252 231 222 207 207 170 C248 179 281 201 301 229 Z",
      "M306 218 C335 174 370 155 412 160 C390 198 354 221 306 235 Z",
      "M298 190 C260 161 245 128 255 91 C286 116 302 148 298 190 Z",
      "M305 168 C325 128 354 105 389 102 C376 139 347 164 305 183 Z",
      "M153 338 C124 305 128 269 156 250 C183 278 180 313 153 338 Z",
      "M153 338 C182 303 216 296 244 315 C222 349 188 361 153 338 Z",
      "M447 338 C416 307 420 270 447 250 C475 280 472 316 447 338 Z",
      "M447 338 C476 303 509 296 536 316 C514 348 480 360 447 338 Z"
    ],
    details: [
      "M75 430 H525", "M145 286 C152 300 156 315 153 332", "M459 286 C451 302 448 319 447 333",
      "M260 355 L275 438 M340 355 L325 438", "M210 170 C236 189 265 207 291 231", "M412 160 C376 183 341 207 311 230",
      "M255 91 C273 120 290 151 297 180", "M389 102 C359 126 329 151 308 177"
    ]
  },
  "starlit-botanical": {
    regions: [
      "M212 344 H388 L368 447 H232 Z", "M212 344 L198 324 H402 L388 344 Z",
      "M294 326 C292 266 295 211 300 157 C310 216 310 269 306 326 Z",
      "M298 239 C256 224 229 194 220 158 C258 171 285 197 301 226 Z",
      "M306 208 C334 170 365 153 402 156 C384 190 352 213 306 226 Z",
      "M300 160 C270 129 267 91 299 63 C329 94 328 130 300 160 Z",
      "M106 116 A48 48 0 1 0 202 116 A37 37 0 1 1 106 116 Z",
      "M459 118 L467 136 L487 139 L472 153 L476 173 L459 163 L442 173 L446 153 L431 139 L451 136 Z",
      "M130 206 L136 219 L150 221 L140 231 L143 245 L130 238 L118 245 L120 231 L110 221 L124 219 Z",
      "M466 242 L471 252 L483 254 L474 263 L476 275 L466 269 L455 275 L457 263 L448 254 L460 252 Z"
    ],
    details: ["M233 352 L250 437 M367 352 L350 437", "M299 161 C299 210 301 270 301 319", "M220 158 C246 185 273 208 295 230", "M402 156 C370 182 340 205 310 225"]
  },
  "forest-fox": {
    regions: [
      "M102 375 C118 319 155 286 215 274 C255 256 321 257 370 281 C414 302 451 336 475 384 L453 420 H143 Z",
      "M150 293 L161 174 L242 251 Z", "M329 247 L407 167 L414 298 Z",
      "M190 276 C202 229 244 200 300 199 C357 199 398 230 411 279 C397 329 361 358 300 360 C239 358 201 328 190 276 Z",
      "M204 284 C225 272 253 273 278 289 C260 314 234 326 207 315 Z",
      "M396 284 C375 272 347 273 322 289 C340 314 367 326 393 315 Z",
      "M261 303 C280 285 320 285 339 303 C329 330 311 342 300 344 C288 342 270 330 261 303 Z",
      "M134 380 C89 362 74 327 91 294 C126 306 153 337 165 374 Z",
      "M160 367 C124 343 111 314 124 286 C153 309 171 336 177 365 Z",
      "M164 375 C128 396 120 427 143 450 H200 L213 377 Z",
      "M387 377 L401 450 H457 C480 425 468 397 436 375 Z"
    ],
    details: [
      "M167 193 L197 256 M393 187 L382 257", "M230 282 L249 287 M351 287 L370 282", "M285 318 Q300 327 315 318",
      "M300 327 V342 M285 349 Q300 359 315 349", "M129 390 C154 371 172 363 195 363", "M405 363 C433 364 452 376 466 393",
      "M103 294 C122 322 144 349 164 372"
    ]
  },
  "tea-porch": {
    regions: [
      "M104 336 H496 V365 H104 Z", "M140 365 H166 V463 H140 Z", "M433 365 H459 V463 H433 Z",
      "M196 336 V300 H405 V336 Z", "M253 293 C253 270 267 252 291 248 H341 C365 252 379 270 379 293 V319 H253 Z",
      "M379 267 C425 261 438 281 426 305 C416 322 398 320 379 312 Z", "M269 246 C269 229 282 217 298 217 H338 C355 217 367 230 367 246 Z",
      "M284 217 C284 197 295 185 318 185 C341 185 352 197 352 217 Z", "M244 289 C228 272 229 255 245 245 C261 255 262 272 253 290 Z",
      "M212 290 C196 276 193 259 206 247 C221 260 225 276 220 291 Z", "M235 254 C225 231 231 213 250 205 C262 225 258 241 244 257 Z",
      "M120 300 C120 269 140 244 170 232 C199 246 214 271 210 301 Z", "M129 298 C142 276 162 263 190 257"
    ],
    details: [
      "M104 336 H496", "M196 300 H405", "M253 293 H379", "M296 218 V246", "M310 185 C318 198 328 207 341 214",
      "M381 273 C405 274 417 285 411 300", "M149 246 C161 265 172 281 182 300", "M166 365 V452 M433 365 V452"
    ]
  },
  "lake-cabin": {
    regions: [
      "M82 385 C147 365 211 370 276 386 C346 403 421 402 518 375 V470 H82 Z",
      "M175 235 L300 134 L425 235 V366 H175 Z", "M153 239 L300 117 L447 239 L428 258 L300 153 L172 258 Z",
      "M218 260 H282 V323 H218 Z", "M317 260 H382 V323 H317 Z", "M264 286 H337 V366 H264 Z",
      "M284 181 H316 V224 H284 Z", "M87 196 L149 142 L210 196 Z", "M390 205 L455 145 L524 205 Z",
      "M108 370 C139 347 167 349 186 374 C162 393 132 395 108 370 Z", "M414 370 C443 346 474 350 494 375 C469 395 439 395 414 370 Z"
    ],
    details: [
      "M175 235 L300 134 L425 235", "M185 243 H415", "M218 260 H282 V323 H218 Z", "M317 260 H382 V323 H317 Z",
      "M300 224 V366", "M281 286 H320", "M82 385 C160 374 220 378 276 392 C350 410 427 402 518 375",
      "M95 417 Q150 405 205 417 M345 432 Q420 414 500 426", "M149 142 L163 182 M455 145 L469 184"
    ]
  },
  "pastel-breeze": {
    regions: [
      "M111 174 C113 148 135 131 160 137 C171 106 218 98 241 125 C272 121 290 146 284 174 C278 197 254 207 226 207 H153 C128 207 110 194 111 174 Z",
      "M345 163 L353 141 L362 163 L385 166 L367 181 L372 204 L353 192 L333 204 L338 181 L321 166 Z",
      "M85 351 C150 307 195 306 238 347 C270 378 286 391 317 370 C358 342 399 306 515 324 V409 C413 389 378 417 336 445 C288 476 254 444 211 408 C169 375 132 380 85 414 Z",
      "M87 436 C134 419 174 422 216 448 H87 Z", "M343 452 C403 416 458 414 516 433 V463 H343 Z",
      "M124 264 C130 248 148 241 163 248 C170 227 201 225 212 246 C233 247 239 269 227 282 H143 C129 282 121 274 124 264 Z",
      "M414 238 C422 223 439 220 451 228 C461 209 488 212 494 232 C513 235 519 256 507 267 H430 C415 267 409 251 414 238 Z"
    ],
    details: [
      "M137 170 C145 151 168 150 177 169 M178 169 C188 146 215 147 223 170 M223 170 C235 151 260 157 261 177",
      "M85 351 C150 307 195 306 238 347 C270 378 286 391 317 370 C358 342 399 306 515 324",
      "M85 414 C143 381 177 388 211 415 C257 452 285 472 336 445 C388 417 428 387 515 409",
      "M124 264 C138 253 150 253 163 264 M430 238 C445 231 458 238 465 250"
    ]
  },
  "mini-ocean": {
    regions: [
      "M64 350 C123 326 179 326 238 350 C297 374 355 374 414 350 C463 330 507 331 536 344 V403 C487 386 453 386 410 405 C345 435 289 426 232 404 C169 379 118 382 64 405 Z",
      "M102 243 C133 207 192 204 226 240 C248 265 240 300 214 318 C180 342 126 323 106 291 C95 274 94 258 102 243 Z",
      "M216 258 C242 226 282 219 318 239 C341 253 349 281 334 302 C314 329 266 329 236 308 C216 294 207 275 216 258 Z",
      "M353 263 C379 233 425 228 458 249 C484 266 483 295 458 313 C428 336 382 328 360 304 C348 290 345 276 353 263 Z",
      "M143 171 C155 146 176 133 198 139 C214 144 223 160 219 176 C215 192 200 202 182 200 C163 198 151 187 143 171 Z",
      "M343 169 C354 144 375 133 394 140 C411 147 419 164 412 180 C403 198 384 202 367 193 C355 187 348 180 343 169 Z",
      "M264 409 C278 382 299 369 318 376 C338 383 344 402 334 419 C321 439 289 442 264 409 Z",
      "M478 185 C494 169 513 168 528 180 C513 192 497 198 478 195 Z",
      "M75 196 C90 180 109 178 123 190 C108 204 92 209 75 206 Z"
    ],
    details: [
      "M64 350 C123 326 179 326 238 350 C297 374 355 374 414 350 C463 330 507 331 536 344",
      "M64 405 C118 382 169 379 232 404 C289 426 345 435 410 405 C453 386 487 386 536 403",
      "M111 251 C137 232 177 230 205 249 M226 267 C253 247 290 246 321 261 M364 272 C390 254 424 254 449 270",
      "M181 139 C174 157 174 178 182 200 M383 139 C375 157 376 179 384 198", "M286 395 C301 405 317 405 332 397"
    ]
  },
  "sunny-window": { details: ["M300 82 V420", "M116 264 H484", "M150 112 H282 V250 H150 Z", "M318 112 H450 V250 H318 Z", "M150 278 H282 V390 H150 Z", "M318 278 H450 V390 H318 Z", "M205 392 C205 341 207 306 221 276", "M352 385 H414 V405 H352 Z"] },
  "little-house": { details: ["M147 236 L300 110 L453 236", "M183 259 H270 V409 H183 Z", "M206 285 H248 V339 H206 Z", "M318 257 H409 V326 H318 Z", "M333 274 H361 V301 H333 Z", "M369 274 H395 V301 H369 Z", "M300 110 V92", "M153 428 C198 407 240 406 278 420 C325 437 373 437 430 414"] },
  "moon-meadow": { details: ["M74 428 C145 388 210 396 266 424 C325 454 386 387 525 416", "M145 436 C142 360 126 312 103 273", "M179 431 C184 356 210 303 248 267", "M264 433 C252 359 263 299 292 252", "M354 431 C350 354 380 298 420 260", "M446 425 C440 367 457 322 492 293"] },
  "flower-market": {
    extraRegions: [
      "M199 117 C183 100 188 78 207 71 C223 77 228 99 215 115 Z", "M215 106 C215 83 233 70 250 80 C257 97 242 113 221 119 Z", "M205 119 C181 119 169 137 182 153 C200 158 213 143 218 124 Z", "M224 116 C240 97 262 103 265 122 C257 139 236 139 220 127 Z", "M194 130 C198 151 218 159 232 143 C235 126 218 116 202 121 Z",
      "M430 169 C416 153 423 133 442 130 C457 141 454 160 438 171 Z", "M439 162 C442 141 461 133 475 145 C478 163 461 175 443 174 Z", "M426 177 C406 178 397 195 411 208 C429 207 437 192 437 176 Z", "M446 175 C462 158 482 165 483 184 C474 200 455 198 441 184 Z", "M414 187 C421 205 440 209 450 193 C448 176 433 170 420 179 Z",
      "M315 100 C302 82 310 62 330 60 C346 74 342 91 325 104 Z", "M328 95 C332 74 351 66 365 80 C366 98 349 108 331 106 Z", "M310 108 C291 112 286 131 301 143 C318 140 325 125 323 108 Z", "M336 106 C353 91 373 100 372 119 C362 134 344 130 331 116 Z", "M302 121 C310 139 329 142 338 126 C335 109 321 103 308 112 Z"
    ],
    details: ["M232 310 H370 L352 439 H249 Z", "M232 310 L218 288 H385 L370 310 Z", "M297 311 C289 255 282 211 253 178", "M307 306 C328 248 361 216 402 207", "M294 296 C262 252 222 237 185 244", "M326 161 C305 136 310 111 332 96"]
  },
  "mosaic-garden": { details: ["M300 55 L351 105 L402 155 L453 205 L402 255 L351 305 L300 355 L249 305 L198 255 L147 205 L198 155 L249 105 Z", "M300 155 L351 205 L300 255 L249 205 Z", "M300 255 L351 305 L300 355 L249 305 Z"] },
  "cathedral-window": { details: ["M160 102 H440 V400 H160 Z", "M200 140 H400 V360 H200 Z", "M220 162 H280 V255 H220 Z", "M320 162 H380 V255 H320 Z", "M220 275 H380 V330 H220 Z", "M300 60 V400", "M160 260 H440"] },
  "rainy-branch": { details: ["M226 124 C242 189 245 250 235 323", "M298 136 C320 184 326 241 319 318", "M212 122 C160 96 116 84 93 103", "M320 134 C362 104 414 96 500 120", "M80 158 L93 179 M124 127 L137 148 M459 167 L472 188 M503 152 L516 174", "M78 437 C109 418 136 412 172 438", "M430 438 C462 413 491 410 518 434"] }
};

let state = loadState();
let currentPageId = state.lastPageId || builtInPages[0].id;
let selectedColour = colours[0];
let activeTool = "fill";
let activeDifficulty = "all";
let painting = false;
let activeStroke = null;
let undoStack = [];
let customShapes = [];
let customFreeStrokes = [];
let createPoints = [];
let createDrawing = false;
let createMode = "shape";
let collabRoom = "";
let collabSyncTimer = null;
let toastTimer;

const fillsSvg = document.querySelector("#fillsSvg");
const linesSvg = document.querySelector("#linesSvg");
const paintCanvas = document.querySelector("#paintCanvas");
const paintContext = paintCanvas.getContext("2d");
const createCanvas = document.querySelector("#createCanvas");
const createContext = createCanvas.getContext("2d");

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") return { pages: {}, lastPageId: "", ...(saved || {}) };
  } catch (error) {
    console.warn("Could not read Stillroom saves.", error);
  }
  return { pages: {}, lastPageId: "" };
}

function saveState() {
  state.lastPageId = currentPageId;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateSavedCount();
  renderPageList();
}

function allPages() {
  return [
    ...builtInPages.map((page) => {
      const artwork = pageArtwork[page.id] || {};
      return { ...page, ...artwork, regions: [...(artwork.regions || page.regions), ...(artwork.extraRegions || [])] };
    }),
    ...(state.customPages || [])
  ];
}

function pageById(id) {
  return allPages().find((page) => page.id === id) || builtInPages[0];
}

function pageData(page) {
  if (!state.pages[page.id]) state.pages[page.id] = { fills: {}, strokes: [], freeStrokes: [] };
  if (!Array.isArray(state.pages[page.id].strokes)) state.pages[page.id].strokes = [];
  if (!Array.isArray(state.pages[page.id].freeStrokes)) state.pages[page.id].freeStrokes = [];
  return state.pages[page.id];
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function renderThumb(page) {
  const paths = page.regions.map((path) => `<path class="thumb-outline" d="${path}"/>`).join("");
  const details = (page.details || []).map((path) => `<path class="thumb-detail" d="${path}"/>`).join("");
  return `<svg viewBox="0 0 600 500" aria-hidden="true">${paths}${details}</svg>`;
}

function renderPageList() {
  const filtered = allPages().filter((page) => activeDifficulty === "all" || page.difficulty === activeDifficulty);
  document.querySelector("#pageList").innerHTML = filtered.map((page) => {
    const isColoured = Object.values(state.pages[page.id]?.fills || {}).some((colour) => colour !== "#fffefa") || (state.pages[page.id]?.strokes || []).length > 0;
    const isCustom = (state.customPages || []).some((customPage) => customPage.id === page.id);
    return `
      <div class="page-item${page.id === currentPageId ? " selected" : ""}">
        <button class="page-card" data-page-id="${escapeHtml(page.id)}" type="button">
          <span class="page-thumb">${renderThumb(page)}</span>
          <span><strong>${escapeHtml(page.title)}</strong><small>${escapeHtml(page.difficulty)} · ${page.regions.length} areas</small></span>
          <span class="page-status${isColoured ? " coloured" : ""}" aria-label="${isColoured ? "Started" : "Not started"}"></span>
        </button>
        ${isCustom ? `<button class="page-delete-button" data-delete-id="${escapeHtml(page.id)}" type="button" aria-label="Delete ${escapeHtml(page.title)}" title="Delete this custom page">✕</button>` : ""}
      </div>
    `;
  }).join("");
  document.querySelectorAll(".page-card").forEach((button) => button.addEventListener("click", () => selectPage(button.dataset.pageId)));
  document.querySelectorAll(".page-delete-button").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteCustomPage(button.dataset.deleteId);
  }));
  document.querySelector("#pageCount").textContent = `${String(allPages().findIndex((page) => page.id === currentPageId) + 1).padStart(2, "0")} / ${String(allPages().length).padStart(2, "0")}`;
}

function deleteCustomPage(id) {
  const page = (state.customPages || []).find((customPage) => customPage.id === id);
  if (!page) return;
  if (!confirm(`Delete "${page.title}" from your library?`)) return;

  state.customPages = (state.customPages || []).filter((customPage) => customPage.id !== id);
  delete state.pages[id];

  if (currentPageId === id) {
    currentPageId = allPages().find((candidate) => candidate.id !== id)?.id || builtInPages[0].id;
  }

  saveState();
  renderPage();
  showToast("Custom page deleted.");
}

function selectPage(id) {
  currentPageId = id;
  undoStack = [];
  renderPage();
  saveState();
}

function renderPage() {
  const page = pageById(currentPageId);
  const data = pageData(page);
  document.querySelector("#pageTitle").textContent = page.title;
  document.querySelector("#pageSubtitle").textContent = page.subtitle || "A colouring page made by you.";
  document.querySelector("#currentCategory").textContent = page.difficulty.toUpperCase();
  document.querySelector("#pageEmpty").hidden = page.regions.length > 0;
  fillsSvg.innerHTML = page.regions.map((path, index) => `<path class="region-fill" data-region="${index}" d="${path}" fill="${data.fills[index] || "#fffefa"}"/>`).join("");
  linesSvg.innerHTML = [
    ...page.regions.map((path) => `<path class="region-line" d="${path}"/>`),
    ...(page.details || []).map((path) => `<path class="region-detail" d="${path}"/>`)
  ].join("");
  renderStrokes(data);
  renderPageList();
}

function renderStrokes(data) {
  const strokes = Array.isArray(data.strokes) ? data.strokes : [];
  const freeStrokes = Array.isArray(data.freeStrokes) ? data.freeStrokes : [];
  paintContext.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
  paintContext.save();
  paintContext.scale(paintCanvas.width / VIEWBOX_WIDTH, paintCanvas.height / VIEWBOX_HEIGHT);

  for (const stroke of strokes) {
    if (!stroke.points?.length) continue;
    const pathElement = fillsSvg.querySelector(`[data-region="${stroke.region}"]`);
    if (!pathElement) continue;
    const clipPath = new Path2D(pathElement.getAttribute("d"));
    paintContext.save();
    paintContext.clip(clipPath);
    paintContext.globalCompositeOperation = stroke.tool === "eraser" ? "destination-out" : "source-over";
    paintContext.globalAlpha = stroke.tool === "marker" ? 0.42 : stroke.tool === "crayon" ? 0.78 : 1;
    paintContext.strokeStyle = stroke.tool === "eraser" ? "#000" : stroke.colour;
    paintContext.fillStyle = stroke.tool === "eraser" ? "#000" : stroke.colour;
    paintContext.lineWidth = stroke.tool === "eraser" ? stroke.size * 1.65 : stroke.size;
    paintContext.lineCap = "round";
    paintContext.lineJoin = "round";
    paintContext.beginPath();
    paintContext.moveTo(stroke.points[0][0], stroke.points[0][1]);
    for (let index = 1; index < stroke.points.length; index += 1) paintContext.lineTo(stroke.points[index][0], stroke.points[index][1]);
    if (stroke.points.length === 1) {
      paintContext.arc(stroke.points[0][0], stroke.points[0][1], Math.max(1, paintContext.lineWidth / 2), 0, Math.PI * 2);
      paintContext.fill();
    } else {
      paintContext.stroke();
    }
    if (stroke.tool === "crayon" && stroke.points.length > 1) {
      paintContext.globalCompositeOperation = "source-over";
      paintContext.globalAlpha = 0.17;
      paintContext.fillStyle = "#fffefa";
      for (let index = 0; index < stroke.points.length; index += 1) {
        const [x, y] = stroke.points[index];
        paintContext.fillRect(x - 1, y - 1, 1.5, 1.5);
      }
    }
    paintContext.restore();
  }

  for (const stroke of freeStrokes) {
    if (!stroke.points?.length) continue;
    paintContext.save();
    paintContext.globalAlpha = stroke.tool === "marker" ? 0.42 : stroke.tool === "crayon" ? 0.78 : 1;
    paintContext.strokeStyle = stroke.colour;
    paintContext.lineWidth = stroke.size;
    paintContext.lineCap = "round";
    paintContext.lineJoin = "round";
    paintContext.beginPath();
    paintContext.moveTo(stroke.points[0][0], stroke.points[0][1]);
    for (let index = 1; index < stroke.points.length; index += 1) paintContext.lineTo(stroke.points[index][0], stroke.points[index][1]);
    if (stroke.points.length === 1) {
      paintContext.arc(stroke.points[0][0], stroke.points[0][1], Math.max(1, stroke.size / 2), 0, Math.PI * 2);
      paintContext.fillStyle = stroke.colour;
      paintContext.fill();
    } else {
      paintContext.stroke();
    }
    paintContext.restore();
  }
  paintContext.restore();
}

function pointFromEvent(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  return [(event.clientX - rect.left) / rect.width * VIEWBOX_WIDTH, (event.clientY - rect.top) / rect.height * VIEWBOX_HEIGHT];
}

function regionAt(point) {
  const testContext = document.createElement("canvas").getContext("2d");
  for (const pathElement of [...fillsSvg.querySelectorAll(".region-fill")].reverse()) {
    if (testContext.isPointInPath(new Path2D(pathElement.getAttribute("d")), point[0], point[1])) return Number(pathElement.dataset.region);
  }
  return null;
}

function snapshotPage() {
  return JSON.stringify(pageData(pageById(currentPageId)));
}

function rememberUndo() {
  undoStack.push(snapshotPage());
  if (undoStack.length > 35) undoStack.shift();
}

function handlePaintStart(event) {
  if (event.button !== 0 && event.pointerType !== "touch") return;
  const point = pointFromEvent(event, paintCanvas);
  const data = pageData(pageById(currentPageId));
  if (activeTool === "fill") {
    const region = regionAt(point);
    if (region === null) return;
    event.preventDefault();
    paintCanvas.setPointerCapture(event.pointerId);
    if (data.fills[region] === selectedColour.value) return;
    rememberUndo();
    data.fills[region] = selectedColour.value;
    renderPage();
    saveState();
    return;
  }

  if (activeTool === "free") {
    event.preventDefault();
    paintCanvas.setPointerCapture(event.pointerId);
    rememberUndo();
    painting = true;
    activeStroke = { kind: "free", tool: "free", colour: selectedColour.value, size: Number(document.querySelector("#brushSize").value), points: [point] };
    data.freeStrokes.push(activeStroke);
    renderStrokes(data);
    return;
  }

  const region = regionAt(point);
  if (region === null) return;
  event.preventDefault();
  paintCanvas.setPointerCapture(event.pointerId);
  rememberUndo();
  painting = true;
  activeStroke = { region, tool: activeTool, colour: selectedColour.value, size: Number(document.querySelector("#brushSize").value), points: [point] };
  data.strokes.push(activeStroke);
  renderStrokes(data);
}

function handlePaintMove(event) {
  if (!painting || !activeStroke) return;
  const point = pointFromEvent(event, paintCanvas);
  const data = pageData(pageById(currentPageId));
  if (activeStroke.kind === "free") {
    activeStroke.points.push(point);
    renderStrokes(data);
    return;
  }
  const region = regionAt(point);
  if (region !== activeStroke.region) return;
  activeStroke.points.push(point);
  renderStrokes(data);
}

function handlePaintEnd() {
  if (!painting) return;
  painting = false;
  activeStroke = null;
  saveState();
}

function setTool(tool) {
  activeTool = tool;
  document.querySelectorAll(".tool-button").forEach((button) => button.classList.toggle("active", button.dataset.tool === tool));
  paintCanvas.style.cursor = tool === "fill" ? "cell" : tool === "eraser" ? "grab" : "crosshair";
}

function setColour(colour) {
  selectedColour = colour;
  document.querySelector("#colourName").textContent = colour.name;
  document.querySelector("#customColour").value = colour.value;
  document.querySelectorAll(".swatch").forEach((button) => button.classList.toggle("active", button.dataset.colour === colour.value));
}

function renderSwatches() {
  document.querySelector("#swatches").innerHTML = `${colours.map((colour) => `<button class="swatch${colour.value === selectedColour.value ? " active" : ""}" data-colour="${colour.value}" title="${escapeHtml(colour.name)}" aria-label="${escapeHtml(colour.name)}" style="background:${colour.value}" type="button"></button>`).join("")}<label class="custom-colour" title="Choose any colour"><input id="customColour" type="color" value="${selectedColour.value}" aria-label="Custom colour"><span>+</span></label>`;
  document.querySelectorAll(".swatch").forEach((button) => button.addEventListener("click", () => setColour(colours.find((colour) => colour.value === button.dataset.colour))));
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
}

function showView(view) {
  document.querySelectorAll(".nav-button").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  document.querySelector("#studioView").hidden = view !== "studio";
  document.querySelector("#createView").hidden = view !== "create";
  document.querySelector("#settingsView").hidden = view !== "settings";
  if (view === "settings") updateSettings();
}

function updateSavedCount() {
  document.querySelector("#savedPageCount").textContent = String(allPages().length);
}

function updateSettings() {
  updateSavedCount();
  const vault = getVaultId();
  const status = document.querySelector("#vaultStatus");
  status.classList.toggle("ready", Boolean(vault));
  status.lastElementChild.textContent = vault ? `Vault ready · ${vault.slice(0, 8)}…` : "No shared vault yet";
  document.querySelector("#copyVaultLink").hidden = !vault;
  const roomInput = document.querySelector("#collabRoomInput");
  const collabStatus = document.querySelector("#collabStatus");
  if (roomInput) roomInput.value = collabRoom || roomInput.value || "";
  if (collabStatus) {
    collabStatus.classList.toggle("ready", Boolean(collabRoom));
    collabStatus.lastElementChild.textContent = collabRoom ? `Room active · ${collabRoom}` : "No active room yet";
  }
}

function getVaultId() {
  const queryVault = new URLSearchParams(location.search).get("vault");
  if (queryVault) {
    localStorage.setItem(BUCKET_KEY, queryVault);
    return queryVault;
  }
  return localStorage.getItem(BUCKET_KEY) || "";
}

function getCollabRoom() {
  return localStorage.getItem("stillroom-collab-room-v1") || "";
}

function setCollabRoom(code) {
  const roomCode = String(code || "").trim();
  if (roomCode) {
    localStorage.setItem("stillroom-collab-room-v1", roomCode);
  } else {
    localStorage.removeItem("stillroom-collab-room-v1");
  }
  collabRoom = roomCode;
  return roomCode;
}

async function createCollabRoom() {
  const room = document.querySelector("#collabRoomInput").value.trim();
  if (!/^\d{6}$/.test(room)) {
    showToast("Use a six-digit room code.");
    return;
  }
  setCollabRoom(room);
  await syncCollabRoom(true);
  startCollabPolling();
  updateSettings();
  showToast(`Collaborating in room ${collabRoom}.`);
}

async function joinCollabRoom() {
  const room = document.querySelector("#collabRoomInput").value.trim();
  if (!/^\d{6}$/.test(room)) {
    showToast("Use a six-digit room code.");
    return;
  }
  setCollabRoom(room);
  await syncCollabRoom(true);
  startCollabPolling();
  updateSettings();
  showToast(`Joined room ${collabRoom}.`);
}

function startCollabPolling() {
  if (collabSyncTimer) return;
  collabSyncTimer = setInterval(() => {
    if (collabRoom) syncCollabRoom(false).catch(() => {});
  }, 2500);
}

async function syncCollabRoom(force = false) {
  if (!collabRoom) return;
  try {
    const response = await fetch(`${VAULT_BASE}/${encodeURIComponent(collabRoom)}`);
    if (response.status === 404) {
      if (force) return;
      return;
    }
    if (!response.ok) throw new Error(`Room responded ${response.status}`);
    const payload = await response.json();
    if (!payload || !payload.updatedAt || typeof payload.pages !== "object") return;
    const remoteTimestamp = new Date(payload.updatedAt).getTime();
    const localTimestamp = Number(localStorage.getItem("stillroom-collab-last")) || 0;
    if (remoteTimestamp <= localTimestamp && !force) return;
    state.pages = { ...state.pages, ...payload.pages };
    if (payload.currentPageId) currentPageId = payload.currentPageId;
    state.lastPageId = payload.lastPageId || currentPageId;
    localStorage.setItem("stillroom-collab-last", String(remoteTimestamp));
    renderPage();
    saveState();
  } catch (error) {
    console.warn("Collab sync failed.", error);
  }
}

async function broadcastCollabRoom() {
  if (!collabRoom) return;
  const payload = {
    version: 1,
    updatedAt: new Date().toISOString(),
    currentPageId,
    lastPageId: currentPageId,
    pages: state.pages
  };
  try {
    const response = await fetch(`${VAULT_BASE}/${encodeURIComponent(collabRoom)}`, { method: "POST", body: JSON.stringify(payload) });
    if (!response.ok) throw new Error(`Room responded ${response.status}`);
    localStorage.setItem("stillroom-collab-last", String(new Date(payload.updatedAt).getTime()));
  } catch (error) {
    console.warn("Collab broadcast failed.", error);
  }
}

async function createVault() {
  const button = document.querySelector("#createVault");
  const email = prompt("Enter an email address for the KVdb vault (KVdb may send service notices). Leave blank to try creating one without an email.");
  button.disabled = true;
  button.textContent = "Setting up…";
  try {
    const body = new URLSearchParams();
    if (email) body.set("email", email);
    const response = await fetch(VAULT_BASE, { method: "POST", body });
    if (!response.ok) throw new Error(`KVdb responded ${response.status}`);
    const vaultId = (await response.text()).trim();
    if (!/^[A-Za-z0-9_-]{8,64}$/.test(vaultId)) throw new Error("The vault service returned an unexpected ID.");
    localStorage.setItem(BUCKET_KEY, vaultId);
    history.replaceState(null, "", `${location.pathname}${location.hash}`);
    updateSettings();
    showToast("Your shared vault is ready.");
  } catch (error) {
    console.error(error);
    showToast("Could not reach KVdb. Check your connection and try again.");
  } finally {
    button.disabled = false;
    button.innerHTML = "Set up save codes <span>↗</span>";
  }
}

function makeCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function createShareCode() {
  let vault = getVaultId();
  if (!vault) {
    showToast("Set up a shared vault first.");
    return;
  }
  const button = document.querySelector("#copyVaultLink");
  try {
    const page = pageById(currentPageId);
    const record = { version: 1, page, data: pageData(page), savedAt: new Date().toISOString() };
    let code = "";
    for (let attempt = 0; attempt < 5; attempt += 1) {
      code = makeCode();
      const check = await fetch(`${VAULT_BASE}/${encodeURIComponent(vault)}/${code}`);
      if (check.status === 404) break;
      if (!check.ok) throw new Error(`KVdb responded ${check.status}`);
      code = "";
    }
    if (!code) throw new Error("Could not find a free code. Try again.");
    const response = await fetch(`${VAULT_BASE}/${encodeURIComponent(vault)}/${code}`, { method: "POST", body: JSON.stringify(record) });
    if (!response.ok) throw new Error(`KVdb responded ${response.status}`);
    document.querySelector("#generatedCode").textContent = code;
    const shareUrl = new URL(location.href);
    shareUrl.searchParams.set("vault", vault);
    document.querySelector("#shareLinkNote").textContent = `Open this page on another device, then enter the code. Link: ${shareUrl.toString()}`;
    document.querySelector("#shareResult").hidden = false;
    showToast("Save code created.");
  } catch (error) {
    console.error(error);
    showToast("Could not create a code. Check your connection and vault.");
  } finally {
    button.disabled = false;
  }
}

async function loadShareCode() {
  const code = document.querySelector("#saveCodeInput").value.trim();
  const vault = getVaultId();
  if (!/^\d{6}$/.test(code)) {
    showToast("Enter a six-digit code.");
    return;
  }
  if (!vault) {
    showToast("Open the vault link first, or set up a vault here.");
    return;
  }
  const button = document.querySelector("#loadCode");
  button.disabled = true;
  try {
    const response = await fetch(`${VAULT_BASE}/${encodeURIComponent(vault)}/${code}`);
    if (!response.ok) throw new Error(response.status === 404 ? "Code not found." : `KVdb responded ${response.status}`);
    const record = await response.json();
    if (record.version !== 1 || !record.page || !record.data) throw new Error("This save code is not valid.");
    const importedPage = record.page;
    const existing = allPages().find((page) => page.id === importedPage.id);
    if (!existing) state.customPages = [...(state.customPages || []), importedPage];
    state.pages[importedPage.id] = record.data;
    currentPageId = importedPage.id;
    saveState();
    renderPage();
    showView("studio");
    showToast("Your page is here.");
  } catch (error) {
    console.error(error);
    showToast(error.message || "Could not open that code.");
  } finally {
    button.disabled = false;
  }
}

function exportBackup() {
  const blob = new Blob([JSON.stringify({ app: "Stillroom", version: 1, state }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "stillroom-backup.json";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Backup downloaded.");
}

async function importBackup(file) {
  try {
    const parsed = JSON.parse(await file.text());
    const incoming = parsed.state || parsed;
    if (!incoming || typeof incoming.pages !== "object" || !Array.isArray(incoming.customPages || [])) throw new Error("That file does not look like a Stillroom backup.");
    state = { pages: {}, lastPageId: "", ...incoming };
    currentPageId = allPages().some((page) => page.id === state.lastPageId) ? state.lastPageId : builtInPages[0].id;
    saveState();
    renderPage();
    showToast("Backup imported.");
  } catch (error) {
    showToast(error.message || "Could not read that backup.");
  }
}

function undo() {
  const snapshot = undoStack.pop();
  if (!snapshot) {
    showToast("Nothing to undo yet.");
    return;
  }
  state.pages[currentPageId] = JSON.parse(snapshot);
  renderPage();
  saveState();
}

function clearCurrentPage() {
  const data = pageData(pageById(currentPageId));
  if (!Object.keys(data.fills).length && !(data.strokes || []).length && !(data.freeStrokes || []).length) return;
  if (!confirm("Clear the colours and brush marks on this page?")) return;
  rememberUndo();
  state.pages[currentPageId] = { fills: {}, strokes: [], freeStrokes: [] };
  renderPage();
  saveState();
  showToast("This page is fresh again.");
}

function downloadCurrentPage() {
  const image = new Image();
  const snapshotCanvas = document.createElement("canvas");
  snapshotCanvas.width = 1200;
  snapshotCanvas.height = 1000;
  const context = snapshotCanvas.getContext("2d");
  context.fillStyle = "#fffefa";
  context.fillRect(0, 0, snapshotCanvas.width, snapshotCanvas.height);
  const canvasSvg = new XMLSerializer().serializeToString(fillsSvg);
  const linesSvgMarkup = new XMLSerializer().serializeToString(linesSvg);
  const canvasData = paintCanvas.toDataURL("image/png");
  const drawSvg = (markup, next) => {
    const source = new Blob([markup.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(source);
    image.onload = () => { context.drawImage(image, 0, 0, 1200, 1000); URL.revokeObjectURL(url); next(); };
    image.src = url;
  };
  const drawCanvas = () => {
    const overlay = new Image();
    overlay.onload = () => {
      context.drawImage(overlay, 0, 0, 1200, 1000);
      drawSvg(linesSvgMarkup, () => {
        const link = document.createElement("a");
        link.download = `${pageById(currentPageId).title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
        link.href = snapshotCanvas.toDataURL("image/png");
        link.click();
      });
    };
    overlay.src = canvasData;
  };
  drawSvg(canvasSvg, drawCanvas);
}

function drawFreeStrokePath(points) {
  if (!points.length) return "";
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point[0].toFixed(1)} ${point[1].toFixed(1)}`).join(" ");
}

function renderCreateShapes() {
  const svg = document.querySelector("#createSvg");
  const shapeCount = customShapes.length + customFreeStrokes.length;
  svg.innerHTML = [
    ...customShapes.map((shape) => `<path class="region-line" d="${shape}"/>`),
    ...customFreeStrokes.map((stroke) => `<path class="region-line" d="${drawFreeStrokePath(stroke.points)}" stroke="${stroke.colour}" stroke-width="${stroke.size}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`)
  ].join("");
  document.querySelector("#shapeCount").textContent = `${shapeCount} ${shapeCount === 1 ? "mark" : "marks"}`;
  createContext.clearRect(0, 0, createCanvas.width, createCanvas.height);
  createContext.save();
  createContext.scale(createCanvas.width / VIEWBOX_WIDTH, createCanvas.height / VIEWBOX_HEIGHT);
  for (const pathData of customShapes) {
    createContext.strokeStyle = "#354139";
    createContext.lineWidth = 3.2;
    createContext.lineJoin = "round";
    createContext.stroke(new Path2D(pathData));
  }
  for (const stroke of customFreeStrokes) {
    createContext.beginPath();
    createContext.strokeStyle = stroke.colour;
    createContext.lineWidth = stroke.size;
    createContext.lineCap = "round";
    createContext.lineJoin = "round";
    if (stroke.points.length === 1) {
      createContext.arc(stroke.points[0][0], stroke.points[0][1], Math.max(1, stroke.size / 2), 0, Math.PI * 2);
      createContext.fillStyle = stroke.colour;
      createContext.fill();
    } else {
      createContext.moveTo(stroke.points[0][0], stroke.points[0][1]);
      stroke.points.slice(1).forEach((point) => createContext.lineTo(point[0], point[1]));
      createContext.stroke();
    }
  }
  if (createMode === "shape" && createPoints.length > 1) {
    createContext.beginPath();
    createContext.moveTo(...createPoints[0]);
    createPoints.slice(1).forEach((point) => createContext.lineTo(...point));
    createContext.strokeStyle = "#53795d";
    createContext.lineWidth = 2;
    createContext.lineCap = "round";
    createContext.lineJoin = "round";
    createContext.stroke();
  }
  createContext.restore();
}

function simplifyPoints(points, distance = 3) {
  return points.filter((point, index) => index === 0 || Math.hypot(point[0] - points[index - 1][0], point[1] - points[index - 1][1]) >= distance);
}

function startCreateShape(event) {
  if (event.button !== 0 && event.pointerType !== "touch") return;
  event.preventDefault();
  createCanvas.setPointerCapture(event.pointerId);
  if (createMode === "free") {
    createDrawing = true;
    const point = pointFromEvent(event, createCanvas);
    customFreeStrokes.push({ colour: selectedColour.value, size: Number(document.querySelector("#brushSize").value), points: [point] });
    renderCreateShapes();
    return;
  }
  createDrawing = true;
  createPoints = [pointFromEvent(event, createCanvas)];
  renderCreateShapes();
}

function moveCreateShape(event) {
  if (!createDrawing) return;
  const point = pointFromEvent(event, createCanvas);
  if (createMode === "free") {
    const stroke = customFreeStrokes.at(-1);
    if (stroke) {
      stroke.points.push(point);
      renderCreateShapes();
    }
    return;
  }
  createPoints.push(point);
  renderCreateShapes();
}

function endCreateShape() {
  if (!createDrawing) return;
  createDrawing = false;
  if (createMode === "free") {
    if (customFreeStrokes.length && customFreeStrokes.at(-1).points.length < 2) {
      customFreeStrokes.pop();
    }
    renderCreateShapes();
    return;
  }
  const points = simplifyPoints(createPoints);
  createPoints = [];
  if (points.length < 5 || Math.hypot(points[0][0] - points.at(-1)[0], points[0][1] - points.at(-1)[1]) < 18) {
    renderCreateShapes();
    showToast("Draw a loop with at least five points to make an area.");
    return;
  }
  const path = `M ${points.map((point) => `${point[0].toFixed(1)} ${point[1].toFixed(1)}`).join(" L ")} Z`;
  customShapes.push(path);
  renderCreateShapes();
}

function saveCustomPage() {
  if (!customShapes.length && !customFreeStrokes.length) {
    showToast("Draw at least one mark or shape first.");
    return;
  }
  const title = document.querySelector("#newPageName").value.trim() || "My little page";
  const difficulty = document.querySelector("#newPageDifficulty").value;
  const page = { id: `custom-${Date.now()}`, title, subtitle: "A colouring page made by you.", difficulty, icon: "✳", regions: customShapes.slice() };
  state.customPages = [...(state.customPages || []), page];
  state.pages[page.id] = { fills: {}, strokes: [], freeStrokes: customFreeStrokes.map((stroke) => ({ ...stroke, points: stroke.points.map(([x, y]) => [x, y]) })) };
  currentPageId = page.id;
  saveState();
  renderPage();
  customShapes = [];
  customFreeStrokes = [];
  createPoints = [];
  renderCreateShapes();
  showView("studio");
  showToast("Your page has been added to the library.");
}

function setCreateMode(mode) {
  createMode = mode;
  document.querySelectorAll(".create-mode-button").forEach((button) => button.classList.toggle("active", button.dataset.mode === mode));
  showToast(mode === "shape" ? "Shape mode on." : "Free-draw mode on.");
}

function setupEvents() {
  document.querySelectorAll(".nav-button").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
  document.querySelectorAll(".filter-chip").forEach((button) => button.addEventListener("click", () => {
    activeDifficulty = button.dataset.difficulty;
    document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("active", chip === button));
    renderPageList();
  }));
  document.querySelectorAll(".tool-button").forEach((button) => button.addEventListener("click", () => setTool(button.dataset.tool)));
  paintCanvas.addEventListener("pointerdown", handlePaintStart);
  paintCanvas.addEventListener("pointermove", handlePaintMove);
  paintCanvas.addEventListener("pointerup", handlePaintEnd);
  paintCanvas.addEventListener("pointercancel", handlePaintEnd);
  document.querySelector("#brushSize").addEventListener("input", (event) => { document.querySelector("#brushSizeValue").textContent = event.target.value; });
  document.querySelector("#customColour").addEventListener("input", (event) => setColour({ name: "Custom", value: event.target.value }));
  document.querySelector("#undoButton").addEventListener("click", undo);
  document.querySelector("#clearButton").addEventListener("click", clearCurrentPage);
  document.querySelector("#downloadButton").addEventListener("click", downloadCurrentPage);
  document.querySelector("#newPageButton").addEventListener("click", () => showView("create"));
  document.querySelector("#saveCustomPage").addEventListener("click", saveCustomPage);
  document.querySelector("#clearCustomPage").addEventListener("click", () => { customShapes = []; customFreeStrokes = []; createPoints = []; renderCreateShapes(); });
  createCanvas.addEventListener("pointerdown", startCreateShape);
  createCanvas.addEventListener("pointermove", moveCreateShape);
  createCanvas.addEventListener("pointerup", endCreateShape);
  createCanvas.addEventListener("pointercancel", endCreateShape);
  document.querySelector("#exportSave").addEventListener("click", exportBackup);
  document.querySelector("#importSave").addEventListener("change", (event) => { if (event.target.files?.[0]) importBackup(event.target.files[0]); event.target.value = ""; });
  document.querySelector("#createVault").addEventListener("click", createVault);
  document.querySelector("#copyVaultLink").addEventListener("click", createShareCode);
  document.querySelector("#loadCode").addEventListener("click", loadShareCode);
  document.querySelector("#saveCodeInput").addEventListener("keydown", (event) => { if (event.key === "Enter") loadShareCode(); });
  document.querySelector("#copyCode").addEventListener("click", async () => {
    await navigator.clipboard.writeText(document.querySelector("#generatedCode").textContent);
    showToast("Code copied.");
  });
  document.querySelector("#copyShareLink").addEventListener("click", async () => {
    const shareUrl = new URL(location.href);
    shareUrl.searchParams.set("vault", getVaultId());
    await navigator.clipboard.writeText(shareUrl.toString());
    showToast("Page link copied.");
  });
  document.querySelector("#resetAll").addEventListener("click", () => {
    if (!confirm("Clear all your local pages and colours? This cannot be undone.")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = { pages: {}, lastPageId: "" };
    currentPageId = builtInPages[0].id;
    renderPage();
    updateSettings();
    showToast("Local pages cleared.");
  });
  document.querySelector("#createCollabButton").addEventListener("click", createCollabRoom);
  document.querySelector("#joinCollabButton").addEventListener("click", joinCollabRoom);
  document.querySelector("#leaveCollabButton").addEventListener("click", () => {
    setCollabRoom("");
    updateSettings();
    showToast("Left the collaboration room.");
  });
  document.querySelector("#syncCollabButton").addEventListener("click", async () => {
    if (!collabRoom) {
      showToast("Create or join a room first.");
      return;
    }
    await broadcastCollabRoom();
    showToast("Room synced.");
  });
  document.querySelectorAll(".create-mode-button").forEach((button) => button.addEventListener("click", () => setCreateMode(button.dataset.mode)));
}

function initializeCollabOnLoad() {
  collabRoom = getCollabRoom();
  if (collabRoom) {
    startCollabPolling();
    syncCollabRoom(true).catch(() => {});
  }
}

renderSwatches();
setupEvents();
renderPage();
renderCreateShapes();
updateSettings();
initializeCollabOnLoad();

window.addEventListener("beforeunload", () => {
  if (collabRoom) broadcastCollabRoom();
});

renderSwatches();
setupEvents();
renderPage();
renderCreateShapes();
updateSettings();