// =====================================================
// DRAGON DASH — game.js
// Juego de esquivar obstáculos con dragón 3D
// =====================================================

// ---------- MODELO OBJ EMBEBIDO ----------
const DRAGON_OBJ = `# Made in Blockbench 5.1.6
mtllib materials.mtl

o Dragon
v 0.5 0.5 0.5
v 0.5 0.5 -0.5
v 0.5 0 0.5
v 0.5 0 -0.5
v -0.5 0.5 0.5
v -0.5 0.5 -0.5
v -0.5 0 0.5
v -0.5 0 -0.5
vt 0.08888888888888889 1
vt 0 1
vt 0 0.9555555555555556
vt 0.08888888888888889 0.9555555555555556
vt 0.08888888888888889 0.9555555555555556
vt 0.08888888888888889 1
vt 0 1
vt 0 0.9555555555555556
vt 0 0.9111111111111111
vt 0.08888888888888889 0.9111111111111111
vt 0.08888888888888889 1
vt 0 1
vt 0.08888888888888889 0.9111111111111111
vt 0.08888888888888889 1
vt 0 1
vt 0 0.9111111111111111
vt 0.08888888888888889 0.9555555555555556
vt 0.08888888888888889 1
vt 0 1
vt 0 0.9555555555555556
vt 0.08888888888888889 1
vt 0 1
vt 0 0.9555555555555556
vt 0.08888888888888889 0.9555555555555556
vn 1 0 0
vn -1 0 0
vn 0 1 0
vn 0 -1 0
vn 0 0 1
vn 0 0 -1
usemtl none
f 2/1/1 1/2/1 3/3/1 4/4/1
f 7/5/2 5/6/2 6/7/2 8/8/2
f 5/9/3 1/10/3 2/11/3 6/12/3
f 4/13/4 3/14/4 7/15/4 8/16/4
f 3/17/5 1/18/5 5/19/5 7/20/5
f 6/21/6 2/22/6 4/23/6 8/24/6
o sphere
v 0.8125 0 0
v 0.8125 0.75 0
v 0.8585537674490992 0.6997595264191645 0.14062499999999997
v 0.8922674651018015 0.5625 0.2435696448143733
v 0.9046075348981985 0.375 0.28125
v 0.8922674651018015 0.18750000000000008 0.2435696448143733
v 0.8585537674490992 0.0502404735808355 0.14062499999999997
v 0.9383212325509007 0.6997595264191645 0.10294464481437336
v 1.030428767449099 0.5625 0.17830535518562662
v 1.0641424651018014 0.375 0.20588928962874672
v 1.030428767449099 0.18750000000000008 0.17830535518562662
v 0.9383212325509007 0.0502404735808355 0.10294464481437336
v 0.984375 0.6997595264191645 0.03768035518562662
v 1.1101962325509007 0.5625 0.06526428962874674
v 1.15625 0.375 0.07536071037125325
v 1.1101962325509007 0.18750000000000008 0.06526428962874674
v 0.984375 0.0502404735808355 0.03768035518562662
v 0.984375 0.6997595264191645 -0.03768035518562663
v 1.1101962325509007 0.5625 -0.06526428962874675
v 1.15625 0.375 -0.07536071037125328
v 1.1101962325509007 0.18750000000000008 -0.06526428962874675
v 0.984375 0.0502404735808355 -0.03768035518562663
v 0.9383212325509007 0.6997595264191645 -0.10294464481437333
v 1.0304287674490993 0.5625 -0.1783053551856266
v 1.0641424651018014 0.375 -0.20588928962874672
v 1.0304287674490993 0.18750000000000008 -0.1783053551856266
v 0.9383212325509007 0.0502404735808355 -0.10294464481437333
v 0.8585537674490993 0.6997595264191645 -0.14062499999999994
v 0.8922674651018017 0.5625 -0.2435696448143733
v 0.9046075348981986 0.375 -0.28124999999999994
v 0.8922674651018017 0.18750000000000008 -0.2435696448143733
v 0.8585537674490993 0.0502404735808355 -0.14062499999999994
v 0.7664462325509008 0.6997595264191645 -0.14062499999999997
v 0.7327325348981986 0.5625 -0.24356964481437335
v 0.7203924651018018 0.375 -0.28125
v 0.7327325348981986 0.18750000000000008 -0.24356964481437335
v 0.7664462325509008 0.0502404735808355 -0.14062499999999997
v 0.6866787674490993 0.6997595264191645 -0.10294464481437336
v 0.5945712325509008 0.5625 -0.17830535518562662
v 0.5608575348981985 0.375 -0.20588928962874672
v 0.5945712325509008 0.18750000000000008 -0.17830535518562662
v 0.6866787674490993 0.0502404735808355 -0.10294464481437336
v 0.640625 0.6997595264191645 -0.0376803551856266
v 0.5148037674490993 0.5625 -0.0652642896287467
v 0.46875 0.375 -0.0753607103712532
v 0.5148037674490993 0.18750000000000008 -0.0652642896287467
v 0.640625 0.0502404735808355 -0.0376803551856266
v 0.640625 0.6997595264191645 0.037680355185626555
v 0.5148037674490993 0.5625 0.06526428962874663
v 0.46875 0.375 0.07536071037125312
v 0.5148037674490993 0.18750000000000008 0.06526428962874663
v 0.640625 0.0502404735808355 0.037680355185626555
v 0.6866787674490993 0.6997595264191645 0.10294464481437332
v 0.5945712325509007 0.5625 0.17830535518562654
v 0.5608575348981985 0.375 0.20588928962874667
v 0.5945712325509007 0.18750000000000008 0.17830535518562654
v 0.6866787674490993 0.0502404735808355 0.10294464481437332
v 0.7664462325509008 0.6997595264191645 0.14062499999999997
v 0.7327325348981985 0.5625 0.2435696448143733
v 0.7203924651018017 0.375 0.28125
v 0.7327325348981985 0.18750000000000008 0.2435696448143733
v 0.7664462325509008 0.0502404735808355 0.14062499999999997
vt 0 0.9827455555555555
vt 0.00893111111111111 0.9827455555555555
vt 0.004465555555555555 1
vt 0.003269444444444445 1
vt 0 0.9827455555555555
vt 0.015470000000000001 0.9827455555555555
vt 0.012200555555555555 1
vt 0.0011966666666666655 1
vt 0 0.9827455555555555
vt 0.017863333333333332 0.9827455555555555
vt 0.016666666666666666 1
vt 0 1
vt 0.0011966666666666655 0.9827455555555555
vt 0.016666666666666666 0.9827455555555555
vt 0.017863333333333332 1
vt 0 1
vt 0.003269444444444445 0.9827455555555555
vt 0.012200555555555555 0.9827455555555555
vt 0.015470000000000001 1
vt 0.00893111111111111 1
vt 0 1
vt 0.004465555555555555 0.9827455555555555
vt 0 0.9827455555555555
vt 0.00893111111111111 0.9827455555555555
vt 0.004465555555555555 1
vt 0.003269444444444445 1
vt 0 0.9827455555555555
vt 0.015470000000000001 0.9827455555555555
vt 0.012200555555555555 1
vt 0.0011966666666666655 1
vt 0 0.9827455555555555
vt 0.017863333333333332 0.9827455555555555
vt 0.016666666666666666 1
vt 0 1
vt 0.0011966666666666655 0.9827455555555555
vt 0.016666666666666666 0.9827455555555555
vt 0.017863333333333332 1
vt 0 1
vt 0.003269444444444445 0.9827455555555555
vt 0.012200555555555555 0.9827455555555555
vt 0.015470000000000001 1
vt 0.00893111111111111 1
vt 0 1
vt 0.004465555555555555 0.9827455555555555
vt 0 0.9827455555555555
vt 0.00893111111111111 0.9827455555555555
vt 0.004465555555555555 1
vt 0.003269444444444445 1
vt 0 0.9827455555555555
vt 0.015470000000000001 0.9827455555555555
vt 0.012200555555555555 1
vt 0.0011966666666666655 1
vt 0 0.9827455555555555
vt 0.017863333333333332 0.9827455555555555
vt 0.016666666666666666 1
vt 0 1
vt 0.0011966666666666655 0.9827455555555555
vt 0.016666666666666666 0.9827455555555555
vt 0.017863333333333332 1
vt 0 1
vt 0.003269444444444445 0.9827455555555555
vt 0.012200555555555555 0.9827455555555555
vt 0.015470000000000001 1
vt 0.00893111111111111 1
vt 0 1
vt 0.004465555555555555 0.9827455555555555
vt 0 0.9827455555555555
vt 0.00893111111111111 0.9827455555555555
vt 0.004465555555555555 1
vt 0.003269444444444445 1
vt 0 0.9827455555555555
vt 0.015470000000000001 0.9827455555555555
vt 0.012200555555555555 1
vt 0.0011966666666666655 1
vt 0 0.9827455555555555
vt 0.017863333333333332 0.9827455555555555
vt 0.016666666666666666 1
vt 0 1
vt 0.0011966666666666655 0.9827455555555555
vt 0.016666666666666666 0.9827455555555555
vt 0.017863333333333332 1
vt 0 1
vt 0.003269444444444445 0.9827455555555555
vt 0.012200555555555555 0.9827455555555555
vt 0.015470000000000001 1
vt 0.00893111111111111 1
vt 0 1
vt 0.004465555555555555 0.9827455555555555
vt 0 0.9827455555555555
vt 0.00893111111111111 0.9827455555555555
vt 0.004465555555555555 1
vt 0.003269444444444445 1
vt 0 0.9827455555555555
vt 0.015470000000000001 0.9827455555555555
vt 0.012200555555555555 1
vt 0.0011966666666666655 1
vt 0 0.9827455555555555
vt 0.017863333333333332 0.9827455555555555
vt 0.016666666666666666 1
vt 0 1
vt 0.0011966666666666655 0.9827455555555555
vt 0.016666666666666666 0.9827455555555555
vt 0.017863333333333332 1
vt 0 1
vt 0.003269444444444445 0.9827455555555555
vt 0.012200555555555555 0.9827455555555555
vt 0.015470000000000001 1
vt 0.00893111111111111 1
vt 0 1
vt 0.004465555555555555 0.9827455555555555
vt 0 0.9827455555555555
vt 0.00893111111111111 0.9827455555555555
vt 0.004465555555555555 1
vt 0.003269444444444445 1
vt 0 0.9827455555555555
vt 0.015470000000000001 0.9827455555555555
vt 0.012200555555555555 1
vt 0.0011966666666666655 1
vt 0 0.9827455555555555
vt 0.017863333333333332 0.9827455555555555
vt 0.016666666666666666 1
vt 0 1
vt 0.0011966666666666655 0.9827455555555555
vt 0.016666666666666666 0.9827455555555555
vt 0.017863333333333332 1
vt 0 1
vt 0.003269444444444445 0.9827455555555555
vt 0.012200555555555555 0.9827455555555555
vt 0.015470000000000001 1
vt 0.00893111111111111 1
vt 0 1
vt 0.004465555555555555 0.9827455555555555
vt 0 0.9827455555555555
vt 0.00893111111111111 0.9827455555555555
vt 0.004465555555555555 1
vt 0.003269444444444445 1
vt 0 0.9827455555555555
vt 0.015470000000000001 0.9827455555555555
vt 0.012200555555555555 1
vt 0.0011966666666666655 1
vt 0 0.9827455555555555
vt 0.017863333333333332 0.9827455555555555
vt 0.016666666666666666 1
vt 0 1
vt 0.0011966666666666655 0.9827455555555555
vt 0.016666666666666666 0.9827455555555555
vt 0.017863333333333332 1
vt 0 1
vt 0.003269444444444445 0.9827455555555555
vt 0.012200555555555555 0.9827455555555555
vt 0.015470000000000001 1
vt 0.00893111111111111 1
vt 0 1
vt 0.004465555555555555 0.9827455555555555
vt 0 0.9827455555555555
vt 0.00893111111111111 0.9827455555555555
vt 0.004465555555555555 1
vt 0.003269444444444445 1
vt 0 0.9827455555555555
vt 0.015470000000000001 0.9827455555555555
vt 0.012200555555555555 1
vt 0.0011966666666666655 1
vt 0 0.9827455555555555
vt 0.017863333333333332 0.9827455555555555
vt 0.016666666666666666 1
vt 0 1
vt 0.0011966666666666655 0.9827455555555555
vt 0.016666666666666666 0.9827455555555555
vt 0.017863333333333332 1
vt 0 1
vt 0.003269444444444445 0.9827455555555555
vt 0.012200555555555555 0.9827455555555555
vt 0.015470000000000001 1
vt 0.00893111111111111 1
vt 0 1
vt 0.004465555555555555 0.9827455555555555
vt 0 0.9827455555555555
vt 0.00893111111111111 0.9827455555555555
vt 0.004465555555555555 1
vt 0.003269444444444445 1
vt 0 0.9827455555555555
vt 0.015470000000000001 0.9827455555555555
vt 0.012200555555555555 1
vt 0.0011966666666666655 1
vt 0 0.9827455555555555
vt 0.017863333333333332 0.9827455555555555
vt 0.016666666666666666 1
vt 0 1
vt 0.0011966666666666655 0.9827455555555555
vt 0.016666666666666666 0.9827455555555555
vt 0.017863333333333332 1
vt 0 1
vt 0.003269444444444445 0.9827455555555555
vt 0.012200555555555555 0.9827455555555555
vt 0.015470000000000001 1
vt 0.00893111111111111 1
vt 0 1
vt 0.004465555555555555 0.9827455555555555
vt 0 0.9827455555555555
vt 0.00893111111111111 0.9827455555555555
vt 0.004465555555555555 1
vt 0.003269444444444445 1
vt 0 0.9827455555555555
vt 0.015470000000000001 0.9827455555555555
vt 0.012200555555555555 1
vt 0.0011966666666666655 1
vt 0 0.9827455555555555
vt 0.017863333333333332 0.9827455555555555
vt 0.016666666666666666 1
vt 0 1
vt 0.0011966666666666655 0.9827455555555555
vt 0.016666666666666666 0.9827455555555555
vt 0.017863333333333332 1
vt 0 1
vt 0.003269444444444445 0.9827455555555555
vt 0.012200555555555555 0.9827455555555555
vt 0.015470000000000001 1
vt 0.00893111111111111 1
vt 0 1
vt 0.004465555555555555 0.9827455555555555
vt 0 0.9827455555555555
vt 0.00893111111111111 0.9827455555555555
vt 0.004465555555555555 1
vt 0.003269444444444445 1
vt 0 0.9827455555555555
vt 0.015470000000000001 0.9827455555555555
vt 0.012200555555555555 1
vt 0.0011966666666666655 1
vt 0 0.9827455555555555
vt 0.017863333333333332 0.9827455555555555
vt 0.016666666666666666 1
vt 0 1
vt 0.0011966666666666655 0.9827455555555555
vt 0.016666666666666666 0.9827455555555555
vt 0.017863333333333332 1
vt 0 1
vt 0.003269444444444445 0.9827455555555555
vt 0.012200555555555555 0.9827455555555555
vt 0.015470000000000001 1
vt 0.00893111111111111 1
vt 0 1
vt 0.004465555555555555 0.9827455555555555
vt 0 0.9827455555555555
vt 0.00893111111111111 0.9827455555555555
vt 0.004465555555555555 1
vt 0.003269444444444445 1
vt 0 0.9827455555555555
vt 0.015470000000000001 0.9827455555555555
vt 0.012200555555555555 1
vt 0.0011966666666666655 1
vt 0 0.9827455555555555
vt 0.017863333333333332 0.9827455555555555
vt 0.016666666666666666 1
vt 0 1
vt 0.0011966666666666655 0.9827455555555555
vt 0.016666666666666666 0.9827455555555555
vt 0.017863333333333332 1
vt 0 1
vt 0.003269444444444445 0.9827455555555555
vt 0.012200555555555555 0.9827455555555555
vt 0.015470000000000001 1
vt 0.00893111111111111 1
vt 0 1
vt 0.004465555555555555 0.9827455555555555
vn 0.1382824056414534 0.9461411000190478 0.292737075111368
vn 0.33628708752433834 0.616526327127954 0.711903281859631
vn 0.4180187636152482 0.2053476152415642 0.8849252342317864
vn 0.4180187636152479 -0.20534761524156428 0.8849252342317864
vn 0.33628708752433867 -0.6165263271279536 0.7119032818596313
vn 0.1382824056414534 -0.9461411000190478 0.292737075111368
vn 0.2418064080834318 0.9552040624150264 0.17063077142068933
vn 0.6180010872250913 0.6541390057929611 0.4360926705286408
vn 0.7959651040629163 0.2257497552376554 0.5616730375621118
vn 0.7959651040629165 -0.22574975523765556 0.5616730375621118
vn 0.6180010872250914 -0.6541390057929607 0.436092670528641
vn 0.2418064080834318 -0.9552040624150264 0.17063077142068933
vn 0.280567449530387 0.9598343118809692 0
vn 0.7371541402007413 0.6757246285173464 0
vn 0.9711350594867374 0.2385302836867701 0
vn 0.9711350594867375 -0.23853028368677026 0
vn 0.7371541402007418 -0.675724628517346 0
vn 0.280567449530387 -0.9598343118809692 0
vn 0.24180640808343176 0.9552040624150262 -0.1706307714206894
vn 0.6180010872250914 0.6541390057929611 -0.43609267052864076
vn 0.7959651040629163 0.22574975523765548 -0.561673037562112
vn 0.7959651040629164 -0.22574975523765564 -0.5616730375621117
vn 0.6180010872250916 -0.6541390057929608 -0.436092670528641
vn 0.2418064080834317 -0.9552040624150263 -0.17063077142068936
vn 0.13828240564145344 0.9461411000190478 -0.29273707511136793
vn 0.33628708752433845 0.6165263271279541 -0.7119032818596309
vn 0.41801876361524826 0.205347615241564 -0.8849252342317865
vn 0.4180187636152482 -0.20534761524156409 -0.8849252342317864
vn 0.3362870875243386 -0.6165263271279536 -0.7119032818596311
vn 0.13828240564145344 -0.9461411000190478 -0.29273707511136793
vn 1.0138209975986087e-16 0.9417052975698792 -0.3364388986559457
vn 2.535023276417842e-16 0.6000000000000002 -0.7999999999999999
vn 2.954322456201299e-16 0.19702282065116836 -0.9803989025609207
vn 3.4113577307215537e-16 -0.1970228206511684 -0.9803989025609207
vn 2.1953945565627105e-16 -0.5999999999999998 -0.8000000000000003
vn 1.0138209975986087e-16 -0.9417052975698792 -0.3364388986559457
vn -0.13828240564145333 0.9461411000190478 -0.2927370751113681
vn -0.3362870875243382 0.616526327127954 -0.7119032818596309
vn -0.418018763615248 0.20534761524156392 -0.8849252342317865
vn -0.41801876361524787 -0.20534761524156403 -0.8849252342317865
vn -0.3362870875243384 -0.6165263271279537 -0.7119032818596313
vn -0.13828240564145333 -0.9461411000190479 -0.2927370751113681
vn -0.2418064080834318 0.9552040624150264 -0.17063077142068933
vn -0.6180010872250914 0.6541390057929611 -0.4360926705286407
vn -0.7959651040629164 0.2257497552376554 -0.5616730375621117
vn -0.7959651040629165 -0.22574975523765556 -0.5616730375621117
vn -0.6180010872250914 -0.6541390057929608 -0.43609267052864087
vn -0.24180640808343182 -0.9552040624150264 -0.17063077142068936
vn -0.280567449530387 0.9598343118809693 0
vn -0.7371541402007414 0.6757246285173464 -2.854962769567122e-16
vn -0.9711350594867375 0.23853028368677012 0
vn -0.9711350594867374 -0.23853028368677026 -4.130039985097753e-16
vn -0.7371541402007419 -0.6757246285173459 0
vn -0.280567449530387 -0.9598343118809693 0
vn -0.2418064080834319 0.9552040624150264 0.17063077142068928
vn -0.6180010872250914 0.6541390057929612 0.4360926705286403
vn -0.7959651040629165 0.2257497552376552 0.5616730375621116
vn -0.7959651040629167 -0.22574975523765534 0.5616730375621114
vn -0.6180010872250917 -0.6541390057929609 0.43609267052864054
vn -0.2418064080834319 -0.9552040624150264 0.17063077142068928
vn -0.1382824056414535 0.9461411000190479 0.29273707511136793
vn -0.3362870875243385 0.6165263271279541 0.7119032818596309
vn -0.4180187636152484 0.2053476152415639 0.8849252342317863
vn -0.4180187636152481 -0.2053476152415639 0.8849252342317864
vn -0.33628708752433867 -0.6165263271279536 0.711903281859631
vn -0.1382824056414535 -0.9461411000190479 0.29273707511136793
vn 0 0.9417052975698792 0.3364388986559456
vn 0 0.6 0.8
vn 0 0.19702282065116858 0.9803989025609207
vn 0 -0.1970228206511687 0.9803989025609205
vn 0 -0.5999999999999995 0.8000000000000005
vn 0 -0.9417052975698792 0.3364388986559456
usemtl none
f 11/25/7 16/26/7 10/27/7
f 11/28/8 12/29/8 17/30/8 16/31/8
f 12/32/9 13/33/9 18/34/9 17/35/9
f 13/36/10 14/37/10 19/38/10 18/39/10
f 14/40/11 15/41/11 20/42/11 19/43/11
f 20/44/12 15/45/12 9/46/12
f 16/47/13 21/48/13 10/49/13
f 16/50/14 17/51/14 22/52/14 21/53/14
f 17/54/15 18/55/15 23/56/15 22/57/15
f 18/58/16 19/59/16 24/60/16 23/61/16
f 19/62/17 20/63/17 25/64/17 24/65/17
f 25/66/18 20/67/18 9/68/18
f 21/69/19 26/70/19 10/71/19
f 21/72/20 22/73/20 27/74/20 26/75/20
f 22/76/21 23/77/21 28/78/21 27/79/21
f 23/80/22 24/81/22 29/82/22 28/83/22
f 24/84/23 25/85/23 30/86/23 29/87/23
f 30/88/24 25/89/24 9/90/24
f 26/91/25 31/92/25 10/93/25
f 26/94/26 27/95/26 32/96/26 31/97/26
f 27/98/27 28/99/27 33/100/27 32/101/27
f 28/102/28 29/103/28 34/104/28 33/105/28
f 29/106/29 30/107/29 35/108/29 34/109/29
f 35/110/30 30/111/30 9/112/30
f 31/113/31 36/114/31 10/115/31
f 31/116/32 32/117/32 37/118/32 36/119/32
f 32/120/33 33/121/33 38/122/33 37/123/33
f 33/124/34 34/125/34 39/126/34 38/127/34
f 34/128/35 35/129/35 40/130/35 39/131/35
f 40/132/36 35/133/36 9/134/36
f 36/135/37 41/136/37 10/137/37
f 36/138/38 37/139/38 42/140/38 41/141/38
f 37/142/39 38/143/39 43/144/39 42/145/39
f 38/146/40 39/147/40 44/148/40 43/149/40
f 39/150/41 40/151/41 45/152/41 44/153/41
f 45/154/42 40/155/42 9/156/42
f 41/157/43 46/158/43 10/159/43
f 41/160/44 42/161/44 47/162/44 46/163/44
f 42/164/45 43/165/45 48/166/45 47/167/45
f 43/168/46 44/169/46 49/170/46 48/171/46
f 44/172/47 45/173/47 50/174/47 49/175/47
f 50/176/48 45/177/48 9/178/48
f 46/179/49 51/180/49 10/181/49
f 46/182/50 47/183/50 52/184/50 51/185/50
f 47/186/51 48/187/51 53/188/51 52/189/51
f 48/190/52 49/191/52 54/192/52 53/193/52
f 49/194/53 50/195/53 55/196/53 54/197/53
f 55/198/54 50/199/54 9/200/54
f 51/201/55 56/202/55 10/203/55
f 51/204/56 52/205/56 57/206/56 56/207/56
f 52/208/57 53/209/57 58/210/57 57/211/57
f 53/212/58 54/213/58 59/214/58 58/215/58
f 54/216/59 55/217/59 60/218/59 59/219/59
f 60/220/60 55/221/60 9/222/60
f 56/223/61 61/224/61 10/225/61
f 56/226/62 57/227/62 62/228/62 61/229/62
f 57/230/63 58/231/63 63/232/63 62/233/63
f 58/234/64 59/235/64 64/236/64 63/237/64
f 59/238/65 60/239/65 65/240/65 64/241/65
f 65/242/66 60/243/66 9/244/66
f 61/245/67 66/246/67 10/247/67
f 61/248/68 62/249/68 67/250/68 66/251/68
f 62/252/69 63/253/69 68/254/69 67/255/69
f 63/256/70 64/257/70 69/258/70 68/259/70
f 64/260/71 65/261/71 70/262/71 69/263/71
f 70/264/72 65/265/72 9/266/72
f 66/267/73 11/268/73 10/269/73
f 66/270/74 67/271/74 12/272/74 11/273/74
f 67/274/75 68/275/75 13/276/75 12/277/75
f 68/278/76 69/279/76 14/280/76 13/281/76
f 69/282/77 70/283/77 15/284/77 14/285/77
f 15/286/78 70/287/78 9/288/78`;

// ---------- CONFIGURACIÓN ----------
const CFG = {
  lives: 3,
  initialSpeed: 5.0,
  maxSpeed: 16.0,
  speedInc: 0.0009,
  obstacleInterval: 1800,
  minInterval: 620,
  dragonMinY: -3.7,
  dragonMaxY:  3.7,
  dragonMoveSpeed: 5.2,
  hitRadius: 0.85,
  difficulties: {
    normal: { speedMult: 1.0, intervalMult: 1.0 },
    hard:   { speedMult: 1.4, intervalMult: 0.72 },
    hell:   { speedMult: 2.0, intervalMult: 0.45 }
  }
};

// ---------- ESTADO ----------
let gameState   = 'MENU';   // MENU | PLAYING | PAUSED | GAMEOVER
let score       = 0;
let lives       = 3;
let highScore   = 0;
let currentDiff = 'normal';
let currentSpeed= 5.0;
let obstTimer   = 0;
let diffTimer   = 0;
let frameCount  = 0;
let shieldActive= false;
let slowActive  = false;
let shieldTimer = 0;
let slowTimer   = 0;
let isInvinc    = false;
let invincTimer = 0;

// ---------- INPUT ----------
const keys = { up: false, down: false };

// ---------- THREE.JS VARS ----------
let scene, camera, renderer, clock;
let dragonGroup = null;
const obstacles  = [];
const particles  = [];
const clouds     = [];
let  dragonLight;
let  shieldMesh  = null;

// ==========================================
// INICIO
// ==========================================
window.addEventListener('DOMContentLoaded', function () {
  highScore = parseInt(localStorage.getItem('dragonDashHS') || '0');
  document.getElementById('best-score-val').textContent = highScore;
  document.getElementById('go-best').textContent = highScore;

  initThree();
  buildEnvironment();
  buildDragon();
  setupInput();
  setupUI();
  renderLoop();
});

// ==========================================
// THREE.JS — SETUP
// ==========================================
function initThree() {
  const canvas = document.getElementById('game-canvas');

  // Escena
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x06061c);
  scene.fog = new THREE.Fog(0x0b0e2e, 20, 48);

  // Cámara con perspectiva lateral-frontal
  camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(0, 2.5, 13);
  camera.lookAt(0, 0.5, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Clock
  clock = new THREE.Clock();

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  // ---- LUCES ----
  // Luz ambiental suave
  scene.add(new THREE.AmbientLight(0x1a2255, 0.9));

  // Luz direccional principal (simula luna)
  const sunLight = new THREE.DirectionalLight(0xaaccff, 1.4);
  sunLight.position.set(6, 10, 8);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);
  scene.add(sunLight);

  // Luz verde que sigue al dragón
  dragonLight = new THREE.PointLight(0x44ff88, 3, 10);
  dragonLight.position.set(-4, 1, 2);
  scene.add(dragonLight);

  // Luces de atmósfera
  const pl1 = new THREE.PointLight(0x8833ff, 1.8, 25);
  pl1.position.set(4, 6, -6);
  scene.add(pl1);

  const pl2 = new THREE.PointLight(0x003399, 1.2, 20);
  pl2.position.set(-8, -2, -4);
  scene.add(pl2);
}

// ==========================================
// ENTORNO (estrellas, nubes, montañas)
// ==========================================
function buildEnvironment() {
  // Estrellas
  const starGeo = new THREE.BufferGeometry();
  const pos = [];
  for (let i = 0; i < 350; i++) {
    pos.push(
      (Math.random() - 0.5) * 90,
      (Math.random() - 0.5) * 45,
      -(Math.random() * 35 + 6)
    );
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  scene.add(new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, sizeAttenuation: true })
  ));

  // Nubes (planos semitransparentes en el fondo)
  const cloudGeo = new THREE.PlaneGeometry(4, 1.5);
  for (let i = 0; i < 9; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: 0x1a2a55,
      transparent: true,
      opacity: 0.25 + Math.random() * 0.2,
      side: THREE.DoubleSide
    });
    const c = new THREE.Mesh(cloudGeo, mat);
    c.position.set(
      (Math.random() - 0.5) * 32,
      (Math.random() - 0.5) * 5 + 1,
      -(Math.random() * 6 + 3)
    );
    c.userData.spd = 0.4 + Math.random() * 0.5;
    clouds.push(c);
    scene.add(c);
  }

  // Suelo (delimitador visual)
  const floorGeo = new THREE.PlaneGeometry(80, 10);
  const floorMat = new THREE.MeshBasicMaterial({ color: 0x000d1a, transparent: true, opacity: 0.55 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -5, -1);
  scene.add(floor);

  // Montañas de fondo
  const mColors = [0x0a1a3e, 0x071030, 0x050c22];
  const mH      = [3.5, 5, 3, 4.8, 2.8, 4.2, 3.6, 5.2];
  const mX      = [-16, -10, -4, 1, 5, 10, 15, 20];
  mH.forEach((h, i) => {
    const geo = new THREE.ConeGeometry(2 + Math.random() * 0.8, h, 6 + Math.floor(Math.random() * 3));
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: mColors[i % 3] }));
    mesh.position.set(mX[i], -5 + h / 2, -9);
    scene.add(mesh);
  });
}

// ==========================================
// DRAGÓN
// ==========================================
function buildDragon() {
  dragonGroup = new THREE.Group();

  // Intentar cargar el OBJ embebido
  let dragonMesh = null;
  try {
    const loader = new THREE.OBJLoader();
    const objGroup = loader.parse(DRAGON_OBJ);

    const mats = [
      new THREE.MeshPhongMaterial({ color: 0x2ecc71, emissive: 0x0a4020, shininess: 130, specular: 0x99ffbb }),
      new THREE.MeshPhongMaterial({ color: 0x44ee88, emissive: 0x082e14, shininess: 90 })
    ];
    let idx = 0;
    objGroup.traverse(ch => {
      if (ch.isMesh) { ch.material = mats[idx % mats.length]; ch.castShadow = true; idx++; }
    });
    objGroup.scale.setScalar(3.2);
    objGroup.rotation.y = Math.PI / 2;
    objGroup.position.set(-0.3, -0.5, 0);
    dragonMesh = objGroup;
  } catch(e) {
    console.warn('OBJ falló, usando dragón de respaldo:', e);
    dragonMesh = makeFallbackDragon();
  }

  dragonGroup.add(dragonMesh);

  // Alas procedurales
  addWings(dragonGroup);

  // Luz de ojos (pequeño efecto)
  const eyeLight = new THREE.PointLight(0xff4422, 1.5, 3);
  eyeLight.position.set(0.8, 0.2, 0);
  dragonGroup.add(eyeLight);

  dragonGroup.position.set(-4.5, 0, 0);
  scene.add(dragonGroup);
}

function makeFallbackDragon() {
  const g = new THREE.Group();
  const matBody = new THREE.MeshPhongMaterial({ color: 0x2ecc71, emissive: 0x0a4020, shininess: 120 });
  const matHead = new THREE.MeshPhongMaterial({ color: 0x44ee88, emissive: 0x083a14, shininess: 100 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 0.75), matBody);
  g.add(body);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 0.5, 8), matBody);
  neck.position.set(0.8, 0.3, 0);
  neck.rotation.z = -0.4;
  g.add(neck);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.58, 0.62), matHead);
  head.position.set(1.15, 0.45, 0);
  g.add(head);

  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.28, 0.42), matHead);
  snout.position.set(1.55, 0.28, 0);
  g.add(snout);

  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.9, 5), matBody);
  tail.position.set(-1.1, 0, 0);
  tail.rotation.z = Math.PI / 2;
  g.add(tail);

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff4400 });
  [-0.18, 0.18].forEach(zOff => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), eyeMat);
    eye.position.set(1.4, 0.52, zOff);
    g.add(eye);
  });

  const hornMat = new THREE.MeshPhongMaterial({ color: 0xeebb00, emissive: 0x553300 });
  [-0.12, 0.12].forEach(zOff => {
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.28, 5), hornMat);
    horn.position.set(1.05, 0.82, zOff);
    g.add(horn);
  });

  return g;
}

function addWings(parent) {
  const wingMat = new THREE.MeshPhongMaterial({
    color: 0x1a8845, emissive: 0x052210,
    transparent: true, opacity: 0.88,
    side: THREE.DoubleSide, shininess: 60
  });

  // Forma de ala usando Shape de Three.js
  const makeWing = () => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.4, 0.7, 1.0, 1.4, 0.2, 1.9);
    shape.bezierCurveTo(-0.5, 1.3, -0.9, 0.6, 0, 0);
    const geo = new THREE.ShapeGeometry(shape, 12);
    return new THREE.Mesh(geo, wingMat.clone());
  };

  const wL = makeWing();
  wL.position.set(-0.1, 0.2, 0.42);
  wL.rotation.set(0.18, 0, 0);
  wL.userData.isWing = true;
  wL.userData.baseRX = 0.18;
  wL.userData.sign   = 1;
  parent.add(wL);

  const wR = makeWing();
  wR.position.set(-0.1, 0.2, -0.42);
  wR.rotation.set(-0.18, Math.PI, 0);
  wR.userData.isWing = true;
  wR.userData.baseRX = -0.18;
  wR.userData.sign   = -1;
  parent.add(wR);
}

// ==========================================
// OBSTÁCULOS
// ==========================================
const OBS_TYPES = [
  { name: 'rock',        color: 0x9a7733, emissive: 0x3a2800, scale: 0.78, sMult: 0.88, pts: 10, r: 0.7  },
  { name: 'fireball',    color: 0xff4500, emissive: 0xcc1100, scale: 0.56, sMult: 1.65, pts: 25, r: 0.5  },
  { name: 'iceSpike',    color: 0x66ccff, emissive: 0x003888, scale: 0.68, sMult: 1.0,  pts: 15, r: 0.62 },
  { name: 'darkCloud',   color: 0x2a3344, emissive: 0x0e1322, scale: 1.2,  sMult: 0.7,  pts: 8,  r: 1.1  },
  { name: 'lightning',   color: 0xffee00, emissive: 0xaaaa00, scale: 0.52, sMult: 2.1,  pts: 38, r: 0.38 },
  { name: 'enemyDragon', color: 0xcc2244, emissive: 0x660022, scale: 0.94, sMult: 1.35, pts: 42, r: 0.82 }
];

const PU_TYPES = [
  { name: 'shield', color: 0xffd700, emissive: 0x886600, dur: 4500, icon: '🛡️' },
  { name: 'slow',   color: 0x00ffcc, emissive: 0x006644, dur: 3500, icon: '⏳' },
  { name: 'life',   color: 0xff3366, emissive: 0x880022, dur: 0,    icon: '❤️' }
];

function makeObsMesh(tp) {
  let geo;
  switch(tp.name) {
    case 'rock':        geo = new THREE.DodecahedronGeometry(0.5, 1); break;
    case 'fireball':    geo = new THREE.SphereGeometry(0.42, 14, 10); break;
    case 'iceSpike':    geo = new THREE.OctahedronGeometry(0.48, 0);  break;
    case 'darkCloud':   geo = new THREE.SphereGeometry(0.62, 9, 7);   break;
    case 'lightning':   geo = new THREE.CylinderGeometry(0.06, 0.22, 1.6, 5); break;
    case 'enemyDragon': geo = new THREE.BoxGeometry(0.9, 0.6, 0.55); break;
    default:             geo = new THREE.SphereGeometry(0.4, 8, 6);
  }
  const mat = new THREE.MeshPhongMaterial({
    color: tp.color, emissive: tp.emissive,
    shininess: (tp.name === 'fireball' || tp.name === 'lightning') ? 160 : 55
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.scale.setScalar(tp.scale);
  mesh.castShadow = true;

  // Aura de fuego
  if (tp.name === 'fireball') {
    const aura = new THREE.Mesh(
      new THREE.SphereGeometry(0.64, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0xff8800, transparent: true, opacity: 0.28 })
    );
    aura.scale.setScalar(tp.scale);
    mesh.add(aura);
  }
  // Luz para rayo
  if (tp.name === 'lightning') {
    mesh.add(new THREE.PointLight(0xffff44, 4, 6));
  }
  // Aura roja enemigo
  if (tp.name === 'enemyDragon') {
    const aura = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.8, 0.7),
      new THREE.MeshBasicMaterial({ color: 0xff2244, transparent: true, opacity: 0.2 })
    );
    mesh.add(aura);
  }
  return mesh;
}

function spawnObstacle() {
  if (gameState !== 'PLAYING') return;

  // 12% de probabilidad de power-up
  if (Math.random() < 0.12) { spawnPowerup(); return; }

  const tp = OBS_TYPES[Math.floor(Math.random() * OBS_TYPES.length)];
  const mesh = makeObsMesh(tp);
  const y = (Math.random() - 0.5) * 7;
  mesh.position.set(14, y, (Math.random() - 0.5) * 0.5);

  const speedFactor = slowActive ? 0.38 : 1;
  mesh.userData = {
    ...mesh.userData,
    isObs: true,
    tp:    tp.name,
    spd:   currentSpeed * tp.sMult * speedFactor,
    pts:   tp.pts,
    rad:   tp.r * tp.scale,
    rotS:  (Math.random() - 0.5) * 2.5
  };
  scene.add(mesh);
  obstacles.push(mesh);
}

function spawnPowerup() {
  const tp = PU_TYPES[Math.floor(Math.random() * PU_TYPES.length)];
  const geo = new THREE.DodecahedronGeometry(0.36, 0);
  const mat = new THREE.MeshPhongMaterial({ color: tp.color, emissive: tp.emissive, shininess: 220 });
  const mesh = new THREE.Mesh(geo, mat);

  // Aura
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(0.56, 8, 6),
    new THREE.MeshBasicMaterial({ color: tp.color, transparent: true, opacity: 0.22 })
  );
  mesh.add(aura);

  mesh.position.set(14, (Math.random() - 0.5) * 6, 0);
  const speedFactor = slowActive ? 0.38 : 1;
  mesh.userData = {
    isPU: true,
    tp:   tp.name,
    spd:  currentSpeed * 0.7 * speedFactor,
    dur:  tp.dur,
    icon: tp.icon,
    rad:  0.52,
    rotS: 1.5
  };
  scene.add(mesh);
  obstacles.push(mesh);
}

function updateObstacles(dt) {
  const dx = dragonGroup.position.x;
  const dy = dragonGroup.position.y;

  for (let i = obstacles.length - 1; i >= 0; i--) {
    const ob = obstacles[i];
    ob.position.x -= ob.userData.spd * dt;

    if (ob.userData.rotS) {
      ob.rotation.x += ob.userData.rotS * dt;
      ob.rotation.y += ob.userData.rotS * 0.65 * dt;
    }

    if (ob.position.x < -16) {
      scene.remove(ob);
      obstacles.splice(i, 1);
      continue;
    }

    // Detección de colisión (esferas)
    const distSq = (ob.position.x - dx) ** 2 + (ob.position.y - dy) ** 2;
    const hitR   = CFG.hitRadius + (ob.userData.rad || 0.5);

    if (distSq < hitR * hitR) {
      if (ob.userData.isPU) {
        activatePU(ob.userData);
        burst(ob.position, ob.material.color.getHex(), 16);
      } else if (!isInvinc && !shieldActive) {
        onHit(ob.position);
      }
      scene.remove(ob);
      obstacles.splice(i, 1);
    }
  }
}

// ==========================================
// POWER-UPS
// ==========================================
function activatePU(ud) {
  showPopup(ud.icon + '  +' + ud.tp.toUpperCase() + '!');
  if (ud.tp === 'shield') {
    shieldActive = true;
    shieldTimer  = ud.dur / 1000;
    showPUBar(ud.icon, shieldTimer);
    addShieldVisual();
  } else if (ud.tp === 'slow') {
    slowActive = true;
    slowTimer  = ud.dur / 1000;
    showPUBar(ud.icon, slowTimer);
    // Reducir velocidad de obstáculos existentes
    obstacles.forEach(o => { o.userData.spd *= 0.38; });
  } else if (ud.tp === 'life') {
    if (lives < 5) { lives++; updateLivesUI(); }
  }
}

function showPUBar(icon, totalTime) {
  document.getElementById('powerup-icon-hud').textContent = icon;
  document.getElementById('powerup-bar-fill').style.width = '100%';
  document.getElementById('powerup-hud').classList.remove('hidden');
  const startT = totalTime;
  const upd = () => {
    const rem = shieldActive ? shieldTimer : (slowActive ? slowTimer : 0);
    const pct = Math.max(0, rem / startT * 100);
    const fill = document.getElementById('powerup-bar-fill');
    if (fill) fill.style.width = pct + '%';
    if (pct > 0 && (shieldActive || slowActive)) requestAnimationFrame(upd);
    else document.getElementById('powerup-hud').classList.add('hidden');
  };
  requestAnimationFrame(upd);
}

function addShieldVisual() {
  if (shieldMesh) { dragonGroup.remove(shieldMesh); shieldMesh = null; }
  const geo = new THREE.SphereGeometry(1.5, 16, 12);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xffd700, transparent: true, opacity: 0.18,
    side: THREE.DoubleSide, wireframe: false
  });
  shieldMesh = new THREE.Mesh(geo, mat);
  dragonGroup.add(shieldMesh);
}

// ==========================================
// COLISIÓN / HIT
// ==========================================
function onHit(pos) {
  lives--;
  updateLivesUI();
  burst(pos, 0xff4400, 24);
  isInvinc    = true;
  invincTimer = 2.0;

  if (lives <= 0) {
    triggerGameOver();
  } else {
    showPopup('💥 ¡Golpe!');
  }
}

// ==========================================
// PARTÍCULAS
// ==========================================
function burst(position, color, count) {
  for (let i = 0; i < count; i++) {
    const geo = new THREE.SphereGeometry(0.09, 4, 4);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 });
    const p   = new THREE.Mesh(geo, mat);
    p.position.copy(position);
    p.userData.vel = new THREE.Vector3(
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 2.5
    );
    p.userData.life    = 0;
    p.userData.maxLife = 0.4 + Math.random() * 0.5;
    particles.push(p);
    scene.add(p);
  }
}

function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.userData.life += dt;
    const t = p.userData.life / p.userData.maxLife;
    if (t >= 1) { scene.remove(p); particles.splice(i, 1); continue; }
    p.position.addScaledVector(p.userData.vel, dt);
    p.userData.vel.y -= 4 * dt;
    p.material.opacity = 1 - t;
    p.scale.setScalar(1 - t * 0.5);
  }
}

// ==========================================
// INPUT
// ==========================================
function setupInput() {
  window.addEventListener('keydown', e => {
    if (['ArrowUp','w','W'].includes(e.key))   keys.up   = true;
    if (['ArrowDown','s','S'].includes(e.key)) keys.down = true;
    if (['Escape','p','P'].includes(e.key)) {
      if (gameState === 'PLAYING') doPause();
      else if (gameState === 'PAUSED') doResume();
    }
  });
  window.addEventListener('keyup', e => {
    if (['ArrowUp','w','W'].includes(e.key))   keys.up   = false;
    if (['ArrowDown','s','S'].includes(e.key)) keys.down = false;
  });

  const cvs = document.getElementById('game-canvas');
  cvs.addEventListener('touchstart', e => {
    e.preventDefault();
    if (gameState === 'PLAYING') {
      const ty = e.touches[0].clientY;
      if (ty < innerHeight / 2) { keys.up = true;  keys.down = false; }
      else                        { keys.down = true; keys.up = false; }
    }
  }, { passive: false });
  cvs.addEventListener('touchmove', e => {
    e.preventDefault();
    if (gameState === 'PLAYING') {
      const ty = e.touches[0].clientY;
      if (ty < innerHeight / 2) { keys.up = true;  keys.down = false; }
      else                        { keys.down = true; keys.up = false; }
    }
  }, { passive: false });
  cvs.addEventListener('touchend', e => {
    e.preventDefault();
    keys.up = false; keys.down = false;
  }, { passive: false });
}

// ==========================================
// GESTIÓN DE ESTADOS
// ==========================================
function doStart() {
  gameState    = 'PLAYING';
  score        = 0;
  lives        = 3;
  frameCount   = 0;
  diffTimer    = 0;
  obstTimer    = 0;
  shieldActive = false;
  slowActive   = false;
  isInvinc     = false;
  shieldMesh   = null;

  const diff  = CFG.difficulties[currentDiff];
  currentSpeed = CFG.initialSpeed * diff.speedMult;

  dragonGroup.position.set(-4.5, 0, 0);
  dragonGroup.rotation.set(0, 0, 0);

  // Limpiar
  [...obstacles].forEach(o => scene.remove(o));
  obstacles.length = 0;
  [...particles].forEach(p => scene.remove(p));
  particles.length = 0;

  updateScoreUI();
  updateLivesUI();
  showScreen('hud');
  clock.getDelta(); // reset delta
}

function doPause() {
  gameState = 'PAUSED';
  showScreen('pause');
}

function doResume() {
  gameState = 'PLAYING';
  clock.getDelta();
  showScreen('hud');
}

function triggerGameOver() {
  gameState = 'GAMEOVER';
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('dragonDashHS', highScore);
  }
  document.getElementById('go-score').textContent = score;
  document.getElementById('go-best').textContent  = highScore;
  showScreen('gameover');
}

function doMenu() {
  gameState = 'MENU';
  [...obstacles].forEach(o => scene.remove(o));
  obstacles.length = 0;
  [...particles].forEach(p => scene.remove(p));
  particles.length = 0;
  document.getElementById('best-score-val').textContent = highScore;
  showScreen('menu');
}

// ==========================================
// UI
// ==========================================
function showScreen(name) {
  ['menu','pause','gameover'].forEach(s =>
    document.getElementById('screen-' + s).classList.add('hidden')
  );
  document.getElementById('hud').classList.add('hidden');
  document.getElementById('btn-pause-game').classList.add('hidden');
  document.getElementById('powerup-hud').classList.add('hidden');

  if (name === 'hud') {
    document.getElementById('hud').classList.remove('hidden');
    document.getElementById('btn-pause-game').classList.remove('hidden');
  } else {
    document.getElementById('screen-' + name).classList.remove('hidden');
  }
}

function updateScoreUI() {
  document.getElementById('score').textContent = score;
}
function updateLivesUI() {
  document.getElementById('lives-display').textContent = '❤️'.repeat(Math.max(0, lives));
}

function showPopup(msg) {
  const el = document.getElementById('popup-msg');
  el.textContent = msg;
  el.classList.add('visible');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('visible'), 1600);
}

function setupUI() {
  document.getElementById('btn-start').addEventListener('click', doStart);
  document.getElementById('btn-retry').addEventListener('click', doStart);
  document.getElementById('btn-go-menu').addEventListener('click', doMenu);
  document.getElementById('btn-pause-game').addEventListener('click', doPause);
  document.getElementById('btn-resume').addEventListener('click', doResume);
  document.getElementById('btn-pause-quit').addEventListener('click', doMenu);

  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentDiff = btn.dataset.diff;
    });
  });

  showScreen('menu');
}

// ==========================================
// BUCLE PRINCIPAL
// ==========================================
function update(dt) {
  dt = Math.min(dt, 0.05);
  const t = performance.now() / 1000;

  // Animación de nubes (siempre)
  clouds.forEach(c => {
    c.position.x -= c.userData.spd * dt * 0.28;
    if (c.position.x < -22) c.position.x = 22;
  });

  // Luz del dragón
  if (dragonLight) {
    dragonLight.intensity = 2.5 + Math.sin(t * 3.5) * 0.6;
    if (dragonGroup) dragonLight.position.set(
      dragonGroup.position.x + 1.5,
      dragonGroup.position.y + 1,
      2
    );
  }

  // Rotación escudo
  if (shieldMesh) shieldMesh.rotation.y += dt * 1.2;

  if (gameState !== 'PLAYING') return;

  // Mover dragón
  if (keys.up)   dragonGroup.position.y = Math.min(CFG.dragonMaxY, dragonGroup.position.y + CFG.dragonMoveSpeed * dt);
  if (keys.down) dragonGroup.position.y = Math.max(CFG.dragonMinY, dragonGroup.position.y - CFG.dragonMoveSpeed * dt);

  // Oscilación suave
  dragonGroup.position.y += Math.sin(t * 2.2) * 0.008;

  // Inclinación
  if (keys.up)        dragonGroup.rotation.z += (0.32 - dragonGroup.rotation.z) * 0.12;
  else if (keys.down) dragonGroup.rotation.z += (-0.32 - dragonGroup.rotation.z) * 0.12;
  else                dragonGroup.rotation.z *= 0.88;

  // Aleteo de alas
  dragonGroup.traverse(ch => {
    if (ch.userData.isWing) {
      ch.rotation.x = ch.userData.baseRX + Math.sin(t * 9) * 0.55 * ch.userData.sign;
    }
  });

  // Parpadeo si invencible
  if (isInvinc) {
    invincTimer -= dt;
    const vis = Math.floor(invincTimer * 7) % 2 === 0;
    dragonGroup.traverse(ch => { if (ch.isMesh) ch.visible = vis; });
    if (invincTimer <= 0) {
      isInvinc = false;
      dragonGroup.traverse(ch => { if (ch.isMesh) ch.visible = true; });
    }
  }

  // Timers de power-ups
  if (shieldActive) {
    shieldTimer -= dt;
    if (shieldTimer <= 0) {
      shieldActive = false;
      if (shieldMesh) { dragonGroup.remove(shieldMesh); shieldMesh = null; }
    }
  }
  if (slowActive) {
    slowTimer -= dt;
    if (slowTimer <= 0) { slowActive = false; }
  }

  // Spawn de obstáculos
  obstTimer += dt * 1000;
  const interval = Math.max(CFG.minInterval, CFG.obstacleInterval - diffTimer * 0.9)
                   * CFG.difficulties[currentDiff].intervalMult;
  if (obstTimer >= interval) {
    obstTimer = 0;
    spawnObstacle();
    // Doble obstáculo en infierno pasado cierto tiempo
    if (currentDiff === 'hell' && diffTimer > 15 && Math.random() < 0.4) spawnObstacle();
  }

  // Actualizar obstáculos y partículas
  updateObstacles(dt);
  updateParticles(dt);

  // Aumentar velocidad
  currentSpeed = Math.min(CFG.maxSpeed, currentSpeed + CFG.speedInc * dt * 1000);
  diffTimer += dt;

  // Score
  frameCount++;
  if (frameCount % 5 === 0) { score++; updateScoreUI(); }
}

function renderLoop() {
  requestAnimationFrame(renderLoop);
  const dt = clock.getDelta();
  update(dt);
  renderer.render(scene, camera);
}
