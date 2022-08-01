// Automatically generated with Reach 0.1.11 (1c3f08fe)
/* eslint-disable */
export const _version = '0.1.11';
export const _versionHash = '0.1.11 (1c3f08fe)';
export const _backendVersion = 17;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  
  return {
    infos: {
      outcome: {
        decode: async (i, svs, args) => {
          if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
            const [v370, v371, v375, v379] = svs;
            return (await ((async () => {
              
              
              return v375;}))(...args));
            }
          if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'))) {
            const [v370, v371, v375, v400, v401, v410] = svs;
            return (await ((async () => {
              
              
              return v375;}))(...args));
            }
          if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'))) {
            const [v370, v371, v375, v400, v435, v449, v459] = svs;
            return (await ((async () => {
              
              
              return v375;}))(...args));
            }
          
          stdlib.assert(false, 'illegal view')
          },
        ty: ctc1
        },
      stage: {
        decode: async (i, svs, args) => {
          if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
            const [v370, v371, v375, v379] = svs;
            return (await ((async () => {
              
              
              return stdlib.checkedBigNumberify('./index.rsh:33:21:decimal', stdlib.UInt_max, '0');}))(...args));
            }
          if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'))) {
            const [v370, v371, v375, v400, v401, v410] = svs;
            return (await ((async () => {
              
              
              return stdlib.checkedBigNumberify('./index.rsh:43:23:decimal', stdlib.UInt_max, '1');}))(...args));
            }
          if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'))) {
            const [v370, v371, v375, v400, v435, v449, v459] = svs;
            return (await ((async () => {
              
              
              return stdlib.checkedBigNumberify('./index.rsh:51:25:decimal', stdlib.UInt_max, '2');}))(...args));
            }
          
          stdlib.assert(false, 'illegal view')
          },
        ty: ctc1
        }
      },
    views: {
      3: [ctc0, ctc0, ctc1, ctc1],
      4: [ctc0, ctc0, ctc1, ctc1, ctc1, ctc1],
      5: [ctc0, ctc0, ctc1, ctc1, ctc0, ctc1, ctc1]
      }
    };
  
  };
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };
export async function Admin(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Admin expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Admin expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Null;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Tuple([ctc2, ctc2]);
  const ctc4 = stdlib.T_Bool;
  const ctc5 = stdlib.T_Tuple([ctc2]);
  
  
  const v365 = stdlib.protect(ctc0, interact.adminAddress, 'for Admin\'s interact field adminAddress');
  const v366 = stdlib.protect(ctc0, interact.aliceAddress, 'for Admin\'s interact field aliceAddress');
  
  const txn1 = await (ctc.sendrecv({
    args: [v366, v365],
    evt_cnt: 2,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./index.rsh:25:12:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc0, ctc0],
    pay: [stdlib.checkedBigNumberify('./index.rsh:25:12:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v370, v371], secs: v373, time: v372, didSend: v29, from: v369 } = txn1;
      
      ;
      
      const v375 = stdlib.checkedBigNumberify('./index.rsh:29:21:decimal', stdlib.UInt_max, '0');
      const v376 = v372;
      const v379 = stdlib.checkedBigNumberify('./index.rsh:20:3:after expr stmt', stdlib.UInt_max, '0');
      
      if (await (async () => {
        
        return true;})()) {
        sim_r.isHalt = false;
        }
      else {
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        }
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [v370, v371], secs: v373, time: v372, didSend: v29, from: v369 } = txn1;
  ;
  stdlib.protect(ctc1, await interact.hasDeployed(), {
    at: './index.rsh:26:32:application',
    fs: ['at ./index.rsh:26:32:application call to [unknown function] (defined at: ./index.rsh:26:32:function exp)', 'at ./index.rsh:26:32:application call to "liftedInteract" (defined at: ./index.rsh:26:32:application)'],
    msg: 'hasDeployed',
    who: 'Admin'
    });
  
  let v375 = stdlib.checkedBigNumberify('./index.rsh:29:21:decimal', stdlib.UInt_max, '0');
  let v376 = v372;
  let v379 = stdlib.checkedBigNumberify('./index.rsh:20:3:after expr stmt', stdlib.UInt_max, '0');
  
  while (await (async () => {
    
    return true;})()) {
    const txn2 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 2,
      out_tys: [ctc3],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [v397], secs: v399, time: v398, didSend: v100, from: v396 } = txn2;
    undefined /* setApiDetails */;
    const v400 = v397[stdlib.checkedBigNumberify('./index.rsh:38:5:spread', stdlib.UInt_max, '0')];
    const v401 = v397[stdlib.checkedBigNumberify('./index.rsh:38:5:spread', stdlib.UInt_max, '1')];
    const v403 = stdlib.addressEq(v396, v370);
    const v404 = stdlib.lt(v400, stdlib.checkedBigNumberify('./index.rsh:39:67:decimal', stdlib.UInt_max, '10000000000000'));
    const v405 = v403 ? v404 : false;
    stdlib.assert(v405, {
      at: 'reach standard library:57:5:application',
      fs: ['at ./index.rsh:39:33:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:38:5:application call to [unknown function] (defined at: ./index.rsh:39:24:function exp)'],
      msg: null,
      who: 'Admin'
      });
    const v410 = stdlib.add(v379, v400);
    ;
    const v413 = true;
    await txn2.getOutput('PlayerAPI_alicePaysWager', 'v413', ctc4, v413);
    const v420 = stdlib.eq(v400, stdlib.checkedBigNumberify('./index.rsh:42:18:decimal', stdlib.UInt_max, '0'));
    if (v420) {
      const cv375 = v375;
      const cv376 = v398;
      const cv379 = v410;
      
      v375 = cv375;
      v376 = cv376;
      v379 = cv379;
      
      continue;}
    else {
      const txn3 = await (ctc.recv({
        didSend: false,
        evt_cnt: 1,
        funcNum: 3,
        out_tys: [ctc5],
        timeoutAt: undefined /* mto */,
        waitIfNotPresent: false
        }));
      const {data: [v436], secs: v438, time: v437, didSend: v174, from: v435 } = txn3;
      undefined /* setApiDetails */;
      const v439 = v436[stdlib.checkedBigNumberify('./index.rsh:45:7:spread', stdlib.UInt_max, '0')];
      const v441 = stdlib.eq(v439, stdlib.checkedBigNumberify('./index.rsh:46:47:decimal', stdlib.UInt_max, '0'));
      const v442 = stdlib.eq(v439, stdlib.checkedBigNumberify('./index.rsh:46:64:decimal', stdlib.UInt_max, '1'));
      const v443 = v441 ? true : v442;
      stdlib.assert(v443, {
        at: 'reach standard library:57:5:application',
        fs: ['at ./index.rsh:46:34:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:45:7:application call to [unknown function] (defined at: ./index.rsh:46:25:function exp)'],
        msg: null,
        who: 'Admin'
        });
      const v446 = stdlib.sub(stdlib.checkedBigNumberify('./index.rsh:47:35:decimal', stdlib.UInt_max, '1'), v439);
      const v447 = stdlib.mul(v400, v446);
      const v449 = stdlib.add(v410, v447);
      ;
      const v451 = true;
      await txn3.getOutput('PlayerAPI_bobPaysWager', 'v451', ctc4, v451);
      if (v441) {
        const v459 = stdlib.add(v437, v401);
        const txn4 = await (ctc.recv({
          didSend: false,
          evt_cnt: 1,
          funcNum: 4,
          out_tys: [ctc3],
          timeoutAt: undefined /* mto */,
          waitIfNotPresent: false
          }));
        const {data: [v484], secs: v486, time: v485, didSend: v289, from: v483 } = txn4;
        undefined /* setApiDetails */;
        const v487 = v484[stdlib.checkedBigNumberify('./index.rsh:54:9:spread', stdlib.UInt_max, '0')];
        const v488 = v484[stdlib.checkedBigNumberify('./index.rsh:54:9:spread', stdlib.UInt_max, '1')];
        const v490 = stdlib.add(v459, stdlib.checkedBigNumberify('./index.rsh:56:37:decimal', stdlib.UInt_max, '2'));
        const v491 = stdlib.lt(v488, v490);
        stdlib.assert(v491, {
          at: 'reach standard library:57:5:application',
          fs: ['at ./index.rsh:56:16:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:54:9:application call to [unknown function] (defined at: ./index.rsh:55:36:function exp)'],
          msg: 'err1',
          who: 'Admin'
          });
        const v493 = stdlib.addressEq(v483, v371);
        const v494 = stdlib.addressEq(v483, v370);
        const v495 = v493 ? true : v494;
        const v496 = stdlib.addressEq(v483, v435);
        const v497 = v495 ? true : v496;
        const v498 = stdlib.eq(v487, stdlib.checkedBigNumberify('./index.rsh:57:102:decimal', stdlib.UInt_max, '0'));
        const v499 = stdlib.eq(v487, stdlib.checkedBigNumberify('./index.rsh:57:119:decimal', stdlib.UInt_max, '1'));
        const v500 = v498 ? true : v499;
        const v501 = stdlib.eq(v487, stdlib.checkedBigNumberify('./index.rsh:57:136:decimal', stdlib.UInt_max, '2'));
        const v502 = v500 ? true : v501;
        const v503 = v497 ? v502 : false;
        stdlib.assert(v503, {
          at: 'reach standard library:57:5:application',
          fs: ['at ./index.rsh:57:16:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:54:9:application call to [unknown function] (defined at: ./index.rsh:55:36:function exp)'],
          msg: 'err2',
          who: 'Admin'
          });
        ;
        const v507 = true;
        await txn4.getOutput('PlayerAPI_sendOutcome', 'v507', ctc4, v507);
        const v515 = stdlib.lt(v485, v459);
        const v517 = v493 ? false : true;
        const v518 = v515 ? v517 : false;
        if (v493) {
          const v520 = stdlib.sub(stdlib.checkedBigNumberify('./index.rsh:63:29:decimal', stdlib.UInt_max, '2'), v487);
          const v521 = stdlib.mul(v400, v520);
          const v522 = stdlib.mul(v521, stdlib.checkedBigNumberify('./index.rsh:63:44:decimal', stdlib.UInt_max, '98'));
          const v523 = stdlib.div(v522, stdlib.checkedBigNumberify('./index.rsh:63:49:decimal', stdlib.UInt_max, '100'));
          const v527 = stdlib.sub(v449, v523);
          ;
          const v528 = stdlib.mul(v400, v487);
          const v529 = stdlib.mul(v528, stdlib.checkedBigNumberify('./index.rsh:64:38:decimal', stdlib.UInt_max, '98'));
          const v530 = stdlib.div(v529, stdlib.checkedBigNumberify('./index.rsh:64:43:decimal', stdlib.UInt_max, '100'));
          const v534 = stdlib.sub(v527, v530);
          ;
          const v539 = stdlib.sub(v534, v534);
          ;
          const cv375 = v487;
          const cv376 = v485;
          const cv379 = v539;
          
          v375 = cv375;
          v376 = cv376;
          v379 = cv379;
          
          continue;}
        else {
          if (v518) {
            if (v494) {
              const v545 = stdlib.sub(v449, v449);
              ;
              const cv375 = stdlib.checkedBigNumberify('./index.rsh:72:29:decimal', stdlib.UInt_max, '5');
              const cv376 = v485;
              const cv379 = v545;
              
              v375 = cv375;
              v376 = cv376;
              v379 = cv379;
              
              continue;}
            else {
              const v550 = stdlib.sub(v449, v449);
              ;
              const cv375 = stdlib.checkedBigNumberify('./index.rsh:76:29:decimal', stdlib.UInt_max, '6');
              const cv376 = v485;
              const cv379 = v550;
              
              v375 = cv375;
              v376 = cv376;
              v379 = cv379;
              
              continue;}}
          else {
            const v554 = stdlib.sub(v449, v400);
            ;
            const v558 = stdlib.sub(v554, v400);
            ;
            const cv375 = stdlib.checkedBigNumberify('./index.rsh:82:27:decimal', stdlib.UInt_max, '3');
            const cv376 = v485;
            const cv379 = v558;
            
            v375 = cv375;
            v376 = cv376;
            v379 = cv379;
            
            continue;}}
        
        }
      else {
        const v562 = stdlib.sub(v449, v400);
        ;
        const cv375 = stdlib.checkedBigNumberify('./index.rsh:89:21:decimal', stdlib.UInt_max, '4');
        const cv376 = v437;
        const cv379 = v562;
        
        v375 = cv375;
        v376 = cv376;
        v379 = cv379;
        
        continue;}
      
      }
    
    }
  return;
  
  
  };
export async function _PlayerAPI_alicePaysWager3(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _PlayerAPI_alicePaysWager3 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _PlayerAPI_alicePaysWager3 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Tuple([ctc1, ctc1]);
  const ctc3 = stdlib.T_Bool;
  const ctc4 = stdlib.T_Null;
  
  
  const [v370, v371, v375, v379] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [ctc0, ctc0, ctc1, ctc1]);
  const v382 = ctc.selfAddress();
  const v384 = stdlib.protect(ctc2, await interact.in(), {
    at: './index.rsh:38:5:application',
    fs: ['at ./index.rsh:38:5:application call to [unknown function] (defined at: ./index.rsh:38:5:function exp)'],
    msg: 'in',
    who: 'PlayerAPI_alicePaysWager'
    });
  const v385 = v384[stdlib.checkedBigNumberify('./index.rsh:38:5:application', stdlib.UInt_max, '0')];
  
  const v390 = stdlib.addressEq(v382, v370);
  const v391 = stdlib.lt(v385, stdlib.checkedBigNumberify('./index.rsh:39:67:decimal', stdlib.UInt_max, '10000000000000'));
  const v392 = v390 ? v391 : false;
  stdlib.assert(v392, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:39:33:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:38:5:application call to [unknown function] (defined at: ./index.rsh:39:24:function exp)'],
    msg: null,
    who: 'PlayerAPI_alicePaysWager'
    });
  
  const txn1 = await (ctc.sendrecv({
    args: [v370, v371, v375, v379, v384],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc2],
    pay: [v385, []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v397], secs: v399, time: v398, didSend: v100, from: v396 } = txn1;
      
      sim_r.txns.push({
        kind: 'api',
        who: "PlayerAPI_alicePaysWager"
        });
      const v400 = v397[stdlib.checkedBigNumberify('./index.rsh:38:5:spread', stdlib.UInt_max, '0')];
      const v401 = v397[stdlib.checkedBigNumberify('./index.rsh:38:5:spread', stdlib.UInt_max, '1')];
      const v410 = stdlib.add(v379, v400);
      sim_r.txns.push({
        amt: v400,
        kind: 'to',
        tok: undefined /* Nothing */
        });
      const v413 = true;
      const v414 = await txn1.getOutput('PlayerAPI_alicePaysWager', 'v413', ctc3, v413);
      
      const v420 = stdlib.eq(v400, stdlib.checkedBigNumberify('./index.rsh:42:18:decimal', stdlib.UInt_max, '0'));
      if (v420) {
        const v733 = v375;
        const v735 = v410;
        sim_r.isHalt = false;
        }
      else {
        sim_r.isHalt = false;
        }
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc0, ctc1, ctc1, ctc2],
    waitIfNotPresent: false
    }));
  const {data: [v397], secs: v399, time: v398, didSend: v100, from: v396 } = txn1;
  undefined /* setApiDetails */;
  const v400 = v397[stdlib.checkedBigNumberify('./index.rsh:38:5:spread', stdlib.UInt_max, '0')];
  const v401 = v397[stdlib.checkedBigNumberify('./index.rsh:38:5:spread', stdlib.UInt_max, '1')];
  const v403 = stdlib.addressEq(v396, v370);
  const v404 = stdlib.lt(v400, stdlib.checkedBigNumberify('./index.rsh:39:67:decimal', stdlib.UInt_max, '10000000000000'));
  const v405 = v403 ? v404 : false;
  stdlib.assert(v405, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:39:33:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:38:5:application call to [unknown function] (defined at: ./index.rsh:39:24:function exp)'],
    msg: null,
    who: 'PlayerAPI_alicePaysWager'
    });
  const v410 = stdlib.add(v379, v400);
  ;
  const v413 = true;
  const v414 = await txn1.getOutput('PlayerAPI_alicePaysWager', 'v413', ctc3, v413);
  stdlib.protect(ctc4, await interact.out(v397, v414), {
    at: './index.rsh:38:5:application',
    fs: ['at ./index.rsh:38:5:application call to [unknown function] (defined at: ./index.rsh:38:5:function exp)', 'at ./index.rsh:41:7:application call to "k1" (defined at: ./index.rsh:38:5:function exp)'],
    msg: 'out',
    who: 'PlayerAPI_alicePaysWager'
    });
  
  const v420 = stdlib.eq(v400, stdlib.checkedBigNumberify('./index.rsh:42:18:decimal', stdlib.UInt_max, '0'));
  if (v420) {
    const v733 = v375;
    const v735 = v410;
    return;
    }
  else {
    return;
    }
  
  
  };
export async function _PlayerAPI_bobPaysWager4(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _PlayerAPI_bobPaysWager4 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _PlayerAPI_bobPaysWager4 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Tuple([ctc1]);
  const ctc3 = stdlib.T_Bool;
  const ctc4 = stdlib.T_Null;
  
  
  const [v370, v371, v375, v400, v401, v410] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'), [ctc0, ctc0, ctc1, ctc1, ctc1, ctc1]);
  const v424 = stdlib.protect(ctc2, await interact.in(), {
    at: './index.rsh:45:7:application',
    fs: ['at ./index.rsh:45:7:application call to [unknown function] (defined at: ./index.rsh:45:7:function exp)'],
    msg: 'in',
    who: 'PlayerAPI_bobPaysWager'
    });
  const v425 = v424[stdlib.checkedBigNumberify('./index.rsh:45:7:application', stdlib.UInt_max, '0')];
  
  const v428 = stdlib.eq(v425, stdlib.checkedBigNumberify('./index.rsh:46:47:decimal', stdlib.UInt_max, '0'));
  const v429 = stdlib.eq(v425, stdlib.checkedBigNumberify('./index.rsh:46:64:decimal', stdlib.UInt_max, '1'));
  const v430 = v428 ? true : v429;
  stdlib.assert(v430, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:46:34:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:45:7:application call to [unknown function] (defined at: ./index.rsh:46:25:function exp)'],
    msg: null,
    who: 'PlayerAPI_bobPaysWager'
    });
  const v433 = stdlib.sub(stdlib.checkedBigNumberify('./index.rsh:47:35:decimal', stdlib.UInt_max, '1'), v425);
  const v434 = stdlib.mul(v400, v433);
  
  const txn1 = await (ctc.sendrecv({
    args: [v370, v371, v375, v400, v401, v410, v424],
    evt_cnt: 1,
    funcNum: 3,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc2],
    pay: [v434, []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v436], secs: v438, time: v437, didSend: v174, from: v435 } = txn1;
      
      sim_r.txns.push({
        kind: 'api',
        who: "PlayerAPI_bobPaysWager"
        });
      const v439 = v436[stdlib.checkedBigNumberify('./index.rsh:45:7:spread', stdlib.UInt_max, '0')];
      const v441 = stdlib.eq(v439, stdlib.checkedBigNumberify('./index.rsh:46:47:decimal', stdlib.UInt_max, '0'));
      const v446 = stdlib.sub(stdlib.checkedBigNumberify('./index.rsh:47:35:decimal', stdlib.UInt_max, '1'), v439);
      const v447 = stdlib.mul(v400, v446);
      const v449 = stdlib.add(v410, v447);
      sim_r.txns.push({
        amt: v447,
        kind: 'to',
        tok: undefined /* Nothing */
        });
      const v451 = true;
      const v452 = await txn1.getOutput('PlayerAPI_bobPaysWager', 'v451', ctc3, v451);
      
      if (v441) {
        const v459 = stdlib.add(v437, v401);
        sim_r.isHalt = false;
        }
      else {
        const v562 = stdlib.sub(v449, v400);
        sim_r.txns.push({
          kind: 'from',
          to: v370,
          tok: undefined /* Nothing */
          });
        const v736 = stdlib.checkedBigNumberify('./index.rsh:89:21:decimal', stdlib.UInt_max, '4');
        const v738 = v562;
        sim_r.isHalt = false;
        }
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc0, ctc1, ctc1, ctc1, ctc1, ctc2],
    waitIfNotPresent: false
    }));
  const {data: [v436], secs: v438, time: v437, didSend: v174, from: v435 } = txn1;
  undefined /* setApiDetails */;
  const v439 = v436[stdlib.checkedBigNumberify('./index.rsh:45:7:spread', stdlib.UInt_max, '0')];
  const v441 = stdlib.eq(v439, stdlib.checkedBigNumberify('./index.rsh:46:47:decimal', stdlib.UInt_max, '0'));
  const v442 = stdlib.eq(v439, stdlib.checkedBigNumberify('./index.rsh:46:64:decimal', stdlib.UInt_max, '1'));
  const v443 = v441 ? true : v442;
  stdlib.assert(v443, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:46:34:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:45:7:application call to [unknown function] (defined at: ./index.rsh:46:25:function exp)'],
    msg: null,
    who: 'PlayerAPI_bobPaysWager'
    });
  const v446 = stdlib.sub(stdlib.checkedBigNumberify('./index.rsh:47:35:decimal', stdlib.UInt_max, '1'), v439);
  const v447 = stdlib.mul(v400, v446);
  const v449 = stdlib.add(v410, v447);
  ;
  const v451 = true;
  const v452 = await txn1.getOutput('PlayerAPI_bobPaysWager', 'v451', ctc3, v451);
  stdlib.protect(ctc4, await interact.out(v436, v452), {
    at: './index.rsh:45:7:application',
    fs: ['at ./index.rsh:45:7:application call to [unknown function] (defined at: ./index.rsh:45:7:function exp)', 'at ./index.rsh:48:9:application call to "k2" (defined at: ./index.rsh:45:7:function exp)'],
    msg: 'out',
    who: 'PlayerAPI_bobPaysWager'
    });
  
  if (v441) {
    const v459 = stdlib.add(v437, v401);
    return;
    }
  else {
    const v562 = stdlib.sub(v449, v400);
    ;
    const v736 = stdlib.checkedBigNumberify('./index.rsh:89:21:decimal', stdlib.UInt_max, '4');
    const v738 = v562;
    return;
    }
  
  
  };
export async function _PlayerAPI_sendOutcome5(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _PlayerAPI_sendOutcome5 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _PlayerAPI_sendOutcome5 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Tuple([ctc1, ctc1]);
  const ctc3 = stdlib.T_Bool;
  const ctc4 = stdlib.T_Null;
  
  
  const [v370, v371, v375, v400, v435, v449, v459] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'), [ctc0, ctc0, ctc1, ctc1, ctc0, ctc1, ctc1]);
  const v460 = ctc.selfAddress();
  const v462 = stdlib.protect(ctc2, await interact.in(), {
    at: './index.rsh:54:9:application',
    fs: ['at ./index.rsh:54:9:application call to [unknown function] (defined at: ./index.rsh:54:9:function exp)'],
    msg: 'in',
    who: 'PlayerAPI_sendOutcome'
    });
  const v463 = v462[stdlib.checkedBigNumberify('./index.rsh:54:9:application', stdlib.UInt_max, '0')];
  const v464 = v462[stdlib.checkedBigNumberify('./index.rsh:54:9:application', stdlib.UInt_max, '1')];
  
  const v468 = stdlib.add(v459, stdlib.checkedBigNumberify('./index.rsh:56:37:decimal', stdlib.UInt_max, '2'));
  const v469 = stdlib.lt(v464, v468);
  stdlib.assert(v469, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:56:16:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:54:9:application call to [unknown function] (defined at: ./index.rsh:55:36:function exp)'],
    msg: 'err1',
    who: 'PlayerAPI_sendOutcome'
    });
  const v471 = stdlib.addressEq(v460, v371);
  const v472 = stdlib.addressEq(v460, v370);
  const v473 = v471 ? true : v472;
  const v474 = stdlib.addressEq(v460, v435);
  const v475 = v473 ? true : v474;
  const v476 = stdlib.eq(v463, stdlib.checkedBigNumberify('./index.rsh:57:102:decimal', stdlib.UInt_max, '0'));
  const v477 = stdlib.eq(v463, stdlib.checkedBigNumberify('./index.rsh:57:119:decimal', stdlib.UInt_max, '1'));
  const v478 = v476 ? true : v477;
  const v479 = stdlib.eq(v463, stdlib.checkedBigNumberify('./index.rsh:57:136:decimal', stdlib.UInt_max, '2'));
  const v480 = v478 ? true : v479;
  const v481 = v475 ? v480 : false;
  stdlib.assert(v481, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:57:16:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:54:9:application call to [unknown function] (defined at: ./index.rsh:55:36:function exp)'],
    msg: 'err2',
    who: 'PlayerAPI_sendOutcome'
    });
  
  const txn1 = await (ctc.sendrecv({
    args: [v370, v371, v375, v400, v435, v449, v459, v462],
    evt_cnt: 1,
    funcNum: 4,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc2],
    pay: [stdlib.checkedBigNumberify('./index.rsh:54:9:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v484], secs: v486, time: v485, didSend: v289, from: v483 } = txn1;
      
      sim_r.txns.push({
        kind: 'api',
        who: "PlayerAPI_sendOutcome"
        });
      const v487 = v484[stdlib.checkedBigNumberify('./index.rsh:54:9:spread', stdlib.UInt_max, '0')];
      const v493 = stdlib.addressEq(v483, v371);
      const v494 = stdlib.addressEq(v483, v370);
      ;
      const v507 = true;
      const v508 = await txn1.getOutput('PlayerAPI_sendOutcome', 'v507', ctc3, v507);
      
      const v515 = stdlib.lt(v485, v459);
      const v517 = v493 ? false : true;
      const v518 = v515 ? v517 : false;
      if (v493) {
        const v520 = stdlib.sub(stdlib.checkedBigNumberify('./index.rsh:63:29:decimal', stdlib.UInt_max, '2'), v487);
        const v521 = stdlib.mul(v400, v520);
        const v522 = stdlib.mul(v521, stdlib.checkedBigNumberify('./index.rsh:63:44:decimal', stdlib.UInt_max, '98'));
        const v523 = stdlib.div(v522, stdlib.checkedBigNumberify('./index.rsh:63:49:decimal', stdlib.UInt_max, '100'));
        const v527 = stdlib.sub(v449, v523);
        sim_r.txns.push({
          kind: 'from',
          to: v370,
          tok: undefined /* Nothing */
          });
        const v528 = stdlib.mul(v400, v487);
        const v529 = stdlib.mul(v528, stdlib.checkedBigNumberify('./index.rsh:64:38:decimal', stdlib.UInt_max, '98'));
        const v530 = stdlib.div(v529, stdlib.checkedBigNumberify('./index.rsh:64:43:decimal', stdlib.UInt_max, '100'));
        const v534 = stdlib.sub(v527, v530);
        sim_r.txns.push({
          kind: 'from',
          to: v435,
          tok: undefined /* Nothing */
          });
        const v539 = stdlib.sub(v534, v534);
        sim_r.txns.push({
          kind: 'from',
          to: v371,
          tok: undefined /* Nothing */
          });
        const v739 = v487;
        const v741 = v539;
        sim_r.isHalt = false;
        }
      else {
        if (v518) {
          if (v494) {
            const v545 = stdlib.sub(v449, v449);
            sim_r.txns.push({
              kind: 'from',
              to: v435,
              tok: undefined /* Nothing */
              });
            const v742 = stdlib.checkedBigNumberify('./index.rsh:72:29:decimal', stdlib.UInt_max, '5');
            const v744 = v545;
            sim_r.isHalt = false;
            }
          else {
            const v550 = stdlib.sub(v449, v449);
            sim_r.txns.push({
              kind: 'from',
              to: v370,
              tok: undefined /* Nothing */
              });
            const v745 = stdlib.checkedBigNumberify('./index.rsh:76:29:decimal', stdlib.UInt_max, '6');
            const v747 = v550;
            sim_r.isHalt = false;
            }}
        else {
          const v554 = stdlib.sub(v449, v400);
          sim_r.txns.push({
            kind: 'from',
            to: v370,
            tok: undefined /* Nothing */
            });
          const v558 = stdlib.sub(v554, v400);
          sim_r.txns.push({
            kind: 'from',
            to: v435,
            tok: undefined /* Nothing */
            });
          const v748 = stdlib.checkedBigNumberify('./index.rsh:82:27:decimal', stdlib.UInt_max, '3');
          const v750 = v558;
          sim_r.isHalt = false;
          }}
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc0, ctc1, ctc1, ctc0, ctc1, ctc1, ctc2],
    waitIfNotPresent: false
    }));
  const {data: [v484], secs: v486, time: v485, didSend: v289, from: v483 } = txn1;
  undefined /* setApiDetails */;
  const v487 = v484[stdlib.checkedBigNumberify('./index.rsh:54:9:spread', stdlib.UInt_max, '0')];
  const v488 = v484[stdlib.checkedBigNumberify('./index.rsh:54:9:spread', stdlib.UInt_max, '1')];
  const v490 = stdlib.add(v459, stdlib.checkedBigNumberify('./index.rsh:56:37:decimal', stdlib.UInt_max, '2'));
  const v491 = stdlib.lt(v488, v490);
  stdlib.assert(v491, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:56:16:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:54:9:application call to [unknown function] (defined at: ./index.rsh:55:36:function exp)'],
    msg: 'err1',
    who: 'PlayerAPI_sendOutcome'
    });
  const v493 = stdlib.addressEq(v483, v371);
  const v494 = stdlib.addressEq(v483, v370);
  const v495 = v493 ? true : v494;
  const v496 = stdlib.addressEq(v483, v435);
  const v497 = v495 ? true : v496;
  const v498 = stdlib.eq(v487, stdlib.checkedBigNumberify('./index.rsh:57:102:decimal', stdlib.UInt_max, '0'));
  const v499 = stdlib.eq(v487, stdlib.checkedBigNumberify('./index.rsh:57:119:decimal', stdlib.UInt_max, '1'));
  const v500 = v498 ? true : v499;
  const v501 = stdlib.eq(v487, stdlib.checkedBigNumberify('./index.rsh:57:136:decimal', stdlib.UInt_max, '2'));
  const v502 = v500 ? true : v501;
  const v503 = v497 ? v502 : false;
  stdlib.assert(v503, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:57:16:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:54:9:application call to [unknown function] (defined at: ./index.rsh:55:36:function exp)'],
    msg: 'err2',
    who: 'PlayerAPI_sendOutcome'
    });
  ;
  const v507 = true;
  const v508 = await txn1.getOutput('PlayerAPI_sendOutcome', 'v507', ctc3, v507);
  stdlib.protect(ctc4, await interact.out(v484, v508), {
    at: './index.rsh:54:9:application',
    fs: ['at ./index.rsh:54:9:application call to [unknown function] (defined at: ./index.rsh:54:9:function exp)', 'at ./index.rsh:59:11:application call to "k3" (defined at: ./index.rsh:54:9:function exp)'],
    msg: 'out',
    who: 'PlayerAPI_sendOutcome'
    });
  
  const v515 = stdlib.lt(v485, v459);
  const v517 = v493 ? false : true;
  const v518 = v515 ? v517 : false;
  if (v493) {
    const v520 = stdlib.sub(stdlib.checkedBigNumberify('./index.rsh:63:29:decimal', stdlib.UInt_max, '2'), v487);
    const v521 = stdlib.mul(v400, v520);
    const v522 = stdlib.mul(v521, stdlib.checkedBigNumberify('./index.rsh:63:44:decimal', stdlib.UInt_max, '98'));
    const v523 = stdlib.div(v522, stdlib.checkedBigNumberify('./index.rsh:63:49:decimal', stdlib.UInt_max, '100'));
    const v527 = stdlib.sub(v449, v523);
    ;
    const v528 = stdlib.mul(v400, v487);
    const v529 = stdlib.mul(v528, stdlib.checkedBigNumberify('./index.rsh:64:38:decimal', stdlib.UInt_max, '98'));
    const v530 = stdlib.div(v529, stdlib.checkedBigNumberify('./index.rsh:64:43:decimal', stdlib.UInt_max, '100'));
    const v534 = stdlib.sub(v527, v530);
    ;
    const v539 = stdlib.sub(v534, v534);
    ;
    const v739 = v487;
    const v741 = v539;
    return;
    }
  else {
    if (v518) {
      if (v494) {
        const v545 = stdlib.sub(v449, v449);
        ;
        const v742 = stdlib.checkedBigNumberify('./index.rsh:72:29:decimal', stdlib.UInt_max, '5');
        const v744 = v545;
        return;
        }
      else {
        const v550 = stdlib.sub(v449, v449);
        ;
        const v745 = stdlib.checkedBigNumberify('./index.rsh:76:29:decimal', stdlib.UInt_max, '6');
        const v747 = v550;
        return;
        }}
    else {
      const v554 = stdlib.sub(v449, v400);
      ;
      const v558 = stdlib.sub(v554, v400);
      ;
      const v748 = stdlib.checkedBigNumberify('./index.rsh:82:27:decimal', stdlib.UInt_max, '3');
      const v750 = v558;
      return;
      }}
  
  
  };
export async function PlayerAPI_alicePaysWager(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for PlayerAPI_alicePaysWager expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for PlayerAPI_alicePaysWager expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  stdlib.assert(step == 3, 'API called in the wrong state. Currently in state: ' + step + ', expected:  [3]');
  if (step == 3) {return _PlayerAPI_alicePaysWager3(ctcTop, interact);}
  };
export async function PlayerAPI_bobPaysWager(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for PlayerAPI_bobPaysWager expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for PlayerAPI_bobPaysWager expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  stdlib.assert(step == 4, 'API called in the wrong state. Currently in state: ' + step + ', expected:  [4]');
  if (step == 4) {return _PlayerAPI_bobPaysWager4(ctcTop, interact);}
  };
export async function PlayerAPI_sendOutcome(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for PlayerAPI_sendOutcome expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for PlayerAPI_sendOutcome expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  stdlib.assert(step == 5, 'API called in the wrong state. Currently in state: ' + step + ', expected:  [5]');
  if (step == 5) {return _PlayerAPI_sendOutcome5(ctcTop, interact);}
  };
const _ALGO = {
  ABI: {
    impure: [`PlayerAPI_alicePaysWager(uint64,uint64)byte`, `PlayerAPI_bobPaysWager(uint64)byte`, `PlayerAPI_sendOutcome(uint64,uint64)byte`],
    pure: [`outcome()uint64`, `stage()uint64`],
    sigs: [`PlayerAPI_alicePaysWager(uint64,uint64)byte`, `PlayerAPI_bobPaysWager(uint64)byte`, `PlayerAPI_sendOutcome(uint64,uint64)byte`, `outcome()uint64`, `stage()uint64`]
    },
  appApproval: `BiAPAAEFBAMIAkirzZPvBLOxqs4Hnb+j1g6v7LvWBGJkQCYDAQABAQAiNQAxGEEEwCpkSSJbNQEhBVs1AjYaABdJQQDQIjUEIzUGSSEIDEAAoEkhCQxAAItJIQoMQABAIQoSRDQBSSUMQAAoSSQMQAASJBJEgAgAAAAAAAAAAjUHQgRlSIAIAAAAAAAAAAE1B0IEVSEEEkQhBa81B0IESSEJEkQ0AUklDEAAJ0kkDEAAEyQSRChkKWRQSTUDV0AINQdCBCRIKGRJNQNXQAg1B0IEFiEEEkQoZEk1A1dACDUHQgQFIQgSRDYaATYaAlBCAEBJIQsMQAAOIQsSRDYaATYaAlBCAoSBiPKooAMSRDYaAUIBnTYaAhc1BDYaAzYaARdJIQQMQAJaSSUMQAGCJRJEJDQBEkQ0BEkiEkw0AhIRRChkKWRQSTUDSUpKVwAgNf9XICA1/iEHWzX9V1AgNfyBcFs1+4F4WzX6STUFNfmABICquPA0+VCwNPkiWzX4NPkhBVs0+iEGCAxEMQA0/hI19zEANP8SNfY09zT2ETEANPwSETT4IhI0+CMSETT4IQYSERBEgAkAAAAAAAAB+wGwKTUHNPdBAGY0/SEGNPgJCyEMCyENCjX1sSKyATT1sggjshA0/7IHszT9NPgLIQwLIQ0KNfQ0+zT1CTT0CTXzsSKyATT0sggjshA0/LIHs7EisgE087III7IQNP6yB7M0/zT+NPgyBjTzSQlCAkkyBjT6DDT3FBBBAEI09kEAHrEisgE0+7III7IQNPyyB7M0/zT+JDIGNPtJCUICGrEisgE0+7III7IQNP+yB7M0/zT+gQYyBjT7SQlCAfuxIrIBNP2yCCOyEDT/sgezsSKyATT9sggjshA0/LIHszT/NP4hBDIGNPs0/Qk0/QlCAchIJTQBEkQ0BEkiEkw0AhIRRChkSTUDSUpXACA1/1cgIDX+IQ5bNf0hB1s1/Ek1BTX7gATXkLTdNPtQsDT7F0k1+iISSTX5NPojEhFENPwjNPoJCzX4NAOBWFs0+Ag19zT4iAH6gAkAAAAAAAABwwGwKTUHNPlBADsyBjQDgVBbCDX2NP80/lA0/RZQNPwWUDEAUDT3FlA09hZQKEsBVwB/ZylLAVd/AWdIJDUBMgY1AkIBWbEisgE0/LIII7IQNP+yB7M0/zT+JTIGNPc0/AlCAPZJIQYMQACvSCEENAESRDQESSISTDQCEhFEKGRJNQNJSVcAIDX/VyAgNf4hDls1/Uk1BTX8gAStYu4KNPxQsDT8Ils1+zT8IQVbNfoxADT/EjT7gYDAyvOEowIMEEQ0AyEHWzT7CDX5NPuIASCACQAAAAAAAAGdAbApNQc0+yISQQANNP80/jT9MgY0+UIAZzT/NP5QNP0WUDT7FlA0+hZQNPkWUChLAVcAYGdIJTUBMgY1AkIAhCISRIGgjQaIAMwiNAESRDQESSISTDQCEhFESTUFSVcAIDX/VyAgNf6ABOssmWI0/1A0/lCwNP80/iIyBiJCAAA1/zX+Nf01/Ek1+zT8UDT9FlA0/xZQKEsBVwBQZ0ghBDUBMgY1AkIAGzEZJBJEsSKyASKyCCOyEDIJsgkyCrIHs0IABTEZIhJEKjQBFjQCFlBnNAZBAAqABBUffHU0B1CwNABJIwgyBBJEMRYSRCNDMRkiEkRC/98iMTQSRCEEMTUSRCIxNhJEIjE3EkQiNQEiNQJC/640AElKIwg1ADgHMgoSRDgQIxJEOAgSRIk=`,
  appClear: `Bg==`,
  companionInfo: null,
  extraPages: 0,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 2,
  stateSize: 128,
  unsupported: [],
  version: 10,
  warnings: []
  };
const _ETH = {
  ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "v370",
                "type": "address"
              },
              {
                "internalType": "address payable",
                "name": "v371",
                "type": "address"
              }
            ],
            "internalType": "struct T3",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T6",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "v370",
                "type": "address"
              },
              {
                "internalType": "address payable",
                "name": "v371",
                "type": "address"
              }
            ],
            "internalType": "struct T3",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T6",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "elem0",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "elem1",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct T7",
                "name": "v397",
                "type": "tuple"
              }
            ],
            "internalType": "struct T8",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T9",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e2",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "elem0",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct T10",
                "name": "v436",
                "type": "tuple"
              }
            ],
            "internalType": "struct T11",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T12",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e3",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "elem0",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "elem1",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct T7",
                "name": "v484",
                "type": "tuple"
              }
            ],
            "internalType": "struct T13",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T14",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e4",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "v0",
        "type": "bool"
      }
    ],
    "name": "_reach_oe_v413",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "v0",
        "type": "bool"
      }
    ],
    "name": "_reach_oe_v451",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "v0",
        "type": "bool"
      }
    ],
    "name": "_reach_oe_v507",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_a0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_a1",
        "type": "uint256"
      }
    ],
    "name": "PlayerAPI_alicePaysWager",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_a0",
        "type": "uint256"
      }
    ],
    "name": "PlayerAPI_bobPaysWager",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_a0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_a1",
        "type": "uint256"
      }
    ],
    "name": "PlayerAPI_sendOutcome",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCreationTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "elem0",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "elem1",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct T7",
                "name": "v397",
                "type": "tuple"
              }
            ],
            "internalType": "struct T8",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T9",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m2",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "elem0",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct T10",
                "name": "v436",
                "type": "tuple"
              }
            ],
            "internalType": "struct T11",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T12",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m3",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "elem0",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "elem1",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct T7",
                "name": "v484",
                "type": "tuple"
              }
            ],
            "internalType": "struct T13",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T14",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m4",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "outcome",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "stage",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
  Bytecode: `0x60806040526040516200207438038062002074833981016040819052620000269162000303565b60008055436003556040805133815282516020808301919091528084015180516001600160a01b039081168486015291015116606082015290517f7ef2bbfb2ea024d26186c284a79cb0c0f7ce810d4811d99d5fe360d4533f50fb9181900360800190a16200009834156009620000f2565b620000a2620001bd565b602080830180515183516001600160a01b0391821690529051820151835191169082015281810180516000908190528151439301929092525160400152620000ea816200011c565b5050620003b5565b81620001185760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b60408051608080820183526000808352602080840182815284860183815260608087018581528951516001600160a01b03908116808a528b51870151821686528b87018051518652518b0151835260039097554360015589518087019790975293519093168589015290519084015251828401528451808303909301835260a090910190935280519192620001b8926002929091019062000209565b505050565b604080516080810182526000918101828152606082019290925290819081526020016200020460405180606001604052806000815260200160008152602001600081525090565b905290565b828054620002179062000378565b90600052602060002090601f0160209004810192826200023b576000855562000286565b82601f106200025657805160ff191683800117855562000286565b8280016001018555821562000286579182015b828111156200028657825182559160200191906001019062000269565b506200029492915062000298565b5090565b5b8082111562000294576000815560010162000299565b604080519081016001600160401b0381118282101715620002e057634e487b7160e01b600052604160045260246000fd5b60405290565b80516001600160a01b0381168114620002fe57600080fd5b919050565b600081830360608112156200031757600080fd5b62000321620002af565b835181526040601f19830112156200033857600080fd5b62000342620002af565b91506200035260208501620002e6565b82526200036260408501620002e6565b6020830152816020820152809250505092915050565b600181811c908216806200038d57607f821691505b60208210811415620003af57634e487b7160e01b600052602260045260246000fd5b50919050565b611caf80620003c56000396000f3fe60806040526004361061009a5760003560e01c806383230757116100615780638323075714610125578063ab53f2c61461013a578063c040e6b81461015d578063ca62aa8214610172578063da9582fb14610185578063eb14aa221461019857005b80631e93b0f1146100a35780632772eddc146100c757806327793f87146100da5780633d0655f0146100ef57806376becbfd1461010257005b366100a157005b005b3480156100af57600080fd5b506003545b6040519081526020015b60405180910390f35b6100a16100d5366004611738565b6101ab565b3480156100e657600080fd5b506100b46101e4565b6100a16100fd366004611762565b610400565b610115610110366004611785565b610435565b60405190151581526020016100be565b34801561013157600080fd5b506001546100b4565b34801561014657600080fd5b5061014f610489565b6040516100be9291906117a7565b34801561016957600080fd5b506100b4610526565b6100a1610180366004611762565b610750565b610115610193366004611804565b610785565b6101156101a6366004611785565b6107d0565b60408051606081018252600080825260208201819052918101919091526101e06101da36849003840184611885565b82610821565b5050565b60006003600054141561029b5760006002805461020090611908565b80601f016020809104026020016040519081016040528092919081815260200182805461022c90611908565b80156102795780601f1061024e57610100808354040283529160200191610279565b820191906000526020600020905b81548152906001019060200180831161025c57829003601f168201915b50505050508060200190518101906102919190611959565b6040015192915050565b60046000541415610346576000600280546102b590611908565b80601f01602080910402602001604051908101604052809291908181526020018280546102e190611908565b801561032e5780601f106103035761010080835404028352916020019161032e565b820191906000526020600020905b81548152906001019060200180831161031157829003601f168201915b505050505080602001905181019061029191906119d9565b600560005414156103f15760006002805461036090611908565b80601f016020809104026020016040519081016040528092919081815260200182805461038c90611908565b80156103d95780601f106103ae576101008083540402835291602001916103d9565b820191906000526020600020905b8154815290600101906020018083116103bc57829003601f168201915b50505050508060200190518101906102919190611a6d565b6103fd60006007610bee565b90565b60408051606081018252600080825260208201819052918101919091526101e061042f36849003840184611ba4565b82610c13565b600061043f6115f5565b6020808201805151869052515101839052610473604080516060810182526000808252602082018190529181019190915290565b61047d8282610c13565b60400151949350505050565b60006060600054600280805461049e90611908565b80601f01602080910402602001604051908101604052809291908181526020018280546104ca90611908565b80156105175780601f106104ec57610100808354040283529160200191610517565b820191906000526020600020905b8154815290600101906020018083116104fa57829003601f168201915b50505050509050915091509091565b6000600360005414156105dc5760006002805461054290611908565b80601f016020809104026020016040519081016040528092919081815260200182805461056e90611908565b80156105bb5780601f10610590576101008083540402835291602001916105bb565b820191906000526020600020905b81548152906001019060200180831161059e57829003601f168201915b50505050508060200190518101906105d39190611959565b50600092915050565b60046000541415610690576000600280546105f690611908565b80601f016020809104026020016040519081016040528092919081815260200182805461062290611908565b801561066f5780601f106106445761010080835404028352916020019161066f565b820191906000526020600020905b81548152906001019060200180831161065257829003601f168201915b505050505080602001905181019061068791906119d9565b50600192915050565b60056000541415610744576000600280546106aa90611908565b80601f01602080910402602001604051908101604052809291908181526020018280546106d690611908565b80156107235780601f106106f857610100808354040283529160200191610723565b820191906000526020600020905b81548152906001019060200180831161070657829003601f168201915b505050505080602001905181019061073b9190611a6d565b50600292915050565b6103fd60006008610bee565b60408051606081018252600080825260208201819052918101919091526101e061077f36849003840184611ba4565b8261123d565b600061078f61162c565b6020810151518390526107bb604080516060810182526000808252602082018190529181019190915290565b6107c58282610821565b602001519392505050565b60006107da6115f5565b602080820180515186905251510183905261080e604080516060810182526000808252602082018190529181019190915290565b610818828261123d565b51949350505050565b6108316004600054146010610bee565b815161084c90158061084557508251600154145b6011610bee565b60008080556002805461085e90611908565b80601f016020809104026020016040519081016040528092919081815260200182805461088a90611908565b80156108d75780601f106108ac576101008083540402835291602001916108d7565b820191906000526020600020905b8154815290600101906020018083116108ba57829003601f168201915b50505050508060200190518101906108ef91906119d9565b905061091e60405180608001604052806000151581526020016000815260200160008152602001600081525090565b60408051338152855160208083019190915286015151518183015290517f7d66d73ff83563156ca4ecd3b15e845da66b8d82f7da365588d378ce806c89ae9181900360600190a1602084015151511580825261099190610987576020850151515160011461098a565b60015b600e610bee565b602084015151516109a3906001611bd6565b82606001516109b29190611bed565b6020820181905260a08301516109c89190611c0c565b604082015260208101516109df903414600f610bee565b604051600181527ffe6ae64f248f109c03778a72cd62127f272002a2e378e8abc168937db66c60789060200160405180910390a160016020840152805115610b4a576080820151610a309043611c0c565b6060808301919091526040805160e0810182526000808252602082018190529181018290529182018190526080820181905260a0820181905260c082015282516001600160a01b0390811682526020808501519091168183015260408085015181840152606080860151818501523360808501528482015160a085015284015160c084015260056000554360015551610b1f9183910181516001600160a01b03908116825260208084015182169083015260408084015190830152606080840151908301526080808401519091169082015260a0828101519082015260c0918201519181019190915260e00190565b60405160208183030381529060405260029080519060200190610b43929190611659565b5050610be8565b815160608301516040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610b87573d6000803e3d6000fd5b50610b906116dd565b825181516001600160a01b0391821690526020808501518351921691810191909152808201805160049052514391015260608301516040830151610bd49190611bd6565b602082015160400152610be681611556565b505b50505050565b816101e05760405163100960cb60e01b81526004810182905260240160405180910390fd5b610c236005600054146015610bee565b8151610c3e901580610c3757508251600154145b6016610bee565b600080805560028054610c5090611908565b80601f0160208091040260200160405190810160405280929190818152602001828054610c7c90611908565b8015610cc95780601f10610c9e57610100808354040283529160200191610cc9565b820191906000526020600020905b815481529060010190602001808311610cac57829003601f168201915b5050505050806020019051810190610ce19190611a6d565b9050610d196040518060a001604052806000151581526020016000151581526020016000815260200160008152602001600081525090565b7fbe0bd92eb159819dccaaa1e6856aa76f27ada69b01718087d20b434404768fe13385604051610d4a929190611c24565b60405180910390a1610d7760028360c00151610d669190611c0c565b602080870151510151106012610bee565b602080830151336001600160a01b03918216811480855285519092161491830191909152610e1b90610dad578160200151610db0565b60015b610dd25782608001516001600160a01b0316336001600160a01b031614610dd5565b60015b610de0576000610e14565b6020850151515115610dfb5760208501515151600114610dfe565b60015b610e115760208501515151600214610e14565b60015b6013610bee565b610e2734156014610bee565b604051600181527ff6dff325d64e18184947edaac9ba1088c7864ba1d78438dfcd859fba2a71f1719060200160405180910390a1600160408401528051156110275760208401515151606490606290610e81906002611bd6565b8460600151610e909190611bed565b610e9a9190611bed565b610ea49190611c57565b6040808301829052835190516001600160a01b039091169180156108fc02916000818181858888f19350505050158015610ee2573d6000803e3d6000fd5b50602084015151516060830151606491606291610eff9190611bed565b610f099190611bed565b610f139190611c57565b60608201819052604082015160a0840151610f2e9190611bd6565b610f389190611bd6565b60808083019190915282015160608201516040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610f7f573d6000803e3d6000fd5b5081602001516001600160a01b03166108fc82608001519081150290604051600060405180830381858888f19350505050158015610fc1573d6000803e3d6000fd5b50610fca6116dd565b825181516001600160a01b03918216905260208085015183519216918101919091528581015151518183018051919091525143910152608082015161100f9080611bd6565b60208201516040015261102181611556565b50610be8565b8160c001514310611039576000611049565b8051611046576001611049565b60005b15611166578060200151156110e15781608001516001600160a01b03166108fc8360a001519081150290604051600060405180830381858888f19350505050158015611099573d6000803e3d6000fd5b506110a26116dd565b825181516001600160a01b0391821690526020808501518351921691810191909152808201805160059052514391015260a083015161100f9080611bd6565b815160a08301516040516001600160a01b039092169181156108fc0291906000818181858888f1935050505015801561111e573d6000803e3d6000fd5b506111276116dd565b825181516001600160a01b0391821690526020808501518351921691810191909152808201805160069052514391015260a083015161100f9080611bd6565b815160608301516040516001600160a01b039092169181156108fc0291906000818181858888f193505050501580156111a3573d6000803e3d6000fd5b5081608001516001600160a01b03166108fc83606001519081150290604051600060405180830381858888f193505050501580156111e5573d6000803e3d6000fd5b506111ee6116dd565b825181516001600160a01b03918216905260208085015183519216918101919091528082018051600390525143910152606083015160a0840151611233908290611bd6565b610bd49190611bd6565b61124d600360005414600c610bee565b815161126890158061126157508251600154145b600d610bee565b60008080556002805461127a90611908565b80601f01602080910402602001604051908101604052809291908181526020018280546112a690611908565b80156112f35780601f106112c8576101008083540402835291602001916112f3565b820191906000526020600020905b8154815290600101906020018083116112d657829003601f168201915b505050505080602001905181019061130b9190611959565b90506113236040518060200160405280600081525090565b7f7c2426e16940992fc6f0a8e9a5186c3f36aefb8bc13eabdb1f18e814d2f254bf3385604051611354929190611c24565b60405180910390a1815161138f906001600160a01b03163314611378576000611388565b602085015151516509184e72a000115b600a610bee565b6020840151515160608301516113a59190611c0c565b8152602084015151516113bb903414600b610bee565b604051600181527f8c61c2e5d87998f2736216be5edc2d98a5f8186811fc330e2d1240846bc336b89060200160405180910390a1600183526020840151515161144f576114066116dd565b825181516001600160a01b039182169052602080850151835192169181019190915260408085015182840180519190915280514393019290925283519151015261102181611556565b61149a6040518060c0016040528060006001600160a01b0316815260200160006001600160a01b03168152602001600081526020016000815260200160008152602001600081525090565b82516001600160a01b0390811680835260208086015183168185019081526040808801518187019081528a8401805151516060808a019182529151518601516080808b019182528b5160a0808d019182526004600055436001558751998a019a909a529651909916948701949094529151908501525194830194909452925191810191909152905160c082015260e0016040516020818303038152906040526002908051906020019061154e929190611659565b505050505050565b60408051608080820183526000808352602080840182815284860183815260608087018581528951516001600160a01b03908116808a528b51870151821686528b87018051518652518b0151835260039097554360015589518087019790975293519093168589015290519084015251828401528451808303909301835260a0909101909352805191926115f09260029290910190611659565b505050565b604051806040016040528060008152602001611627604080516060810182526000602082018181529282015290815290565b905290565b60405180604001604052806000815260200161162760408051808201909152600060208201908152815290565b82805461166590611908565b90600052602060002090601f01602090048101928261168757600085556116cd565b82601f106116a057805160ff19168380011785556116cd565b828001600101855582156116cd579182015b828111156116cd5782518255916020019190600101906116b2565b506116d9929150611723565b5090565b6040805160808101825260009181018281526060820192909252908190815260200161162760405180606001604052806000815260200160008152602001600081525090565b5b808211156116d95760008155600101611724565b60006040828403121561174a57600080fd5b50919050565b60006060828403121561174a57600080fd5b60006060828403121561177457600080fd5b61177e8383611750565b9392505050565b6000806040838503121561179857600080fd5b50508035926020909101359150565b82815260006020604081840152835180604085015260005b818110156117db578581018301518582016060015282016117bf565b818111156117ed576000606083870101525b50601f01601f191692909201606001949350505050565b60006020828403121561181657600080fd5b5035919050565b6040516020810167ffffffffffffffff8111828210171561184e57634e487b7160e01b600052604160045260246000fd5b60405290565b6040805190810167ffffffffffffffff8111828210171561184e57634e487b7160e01b600052604160045260246000fd5b6000818303604081121561189857600080fd5b6040516040810181811067ffffffffffffffff821117156118c957634e487b7160e01b600052604160045260246000fd5b604052833581526020601f19830112156118e257600080fd5b6118ea61181d565b91506118f461181d565b602094850135815282529283015250919050565b600181811c9082168061191c57607f821691505b6020821081141561174a57634e487b7160e01b600052602260045260246000fd5b80516001600160a01b038116811461195457600080fd5b919050565b60006080828403121561196b57600080fd5b6040516080810181811067ffffffffffffffff8211171561199c57634e487b7160e01b600052604160045260246000fd5b6040526119a88361193d565b81526119b66020840161193d565b602082015260408301516040820152606083015160608201528091505092915050565b600060c082840312156119eb57600080fd5b60405160c0810181811067ffffffffffffffff82111715611a1c57634e487b7160e01b600052604160045260246000fd5b604052611a288361193d565b8152611a366020840161193d565b602082015260408301516040820152606083015160608201526080830151608082015260a083015160a08201528091505092915050565b600060e08284031215611a7f57600080fd5b60405160e0810181811067ffffffffffffffff82111715611ab057634e487b7160e01b600052604160045260246000fd5b604052611abc8361193d565b8152611aca6020840161193d565b60208201526040830151604082015260608301516060820152611aef6080840161193d565b608082015260a083015160a082015260c083015160c08201528091505092915050565b60008183036060811215611b2557600080fd5b611b2d611854565b8335815291506040601f1982011215611b4557600080fd5b506040516020810181811067ffffffffffffffff82111715611b7757634e487b7160e01b600052604160045260246000fd5b604052611b82611854565b6020840135815260408401356020820152808252508060208301525092915050565b600060608284031215611bb657600080fd5b61177e8383611b12565b634e487b7160e01b600052601160045260246000fd5b600082821015611be857611be8611bc0565b500390565b6000816000190483118215151615611c0757611c07611bc0565b500290565b60008219821115611c1f57611c1f611bc0565b500190565b6001600160a01b03831681526080810161177e602083018480518252602090810151518051828401520151604090910152565b600082611c7457634e487b7160e01b600052601260045260246000fd5b50049056fea26469706673582212203b0ac0127307842b33ce10483a02163c499e0c6329d2466916dafe969df7617164736f6c634300080c0033`,
  BytecodeLen: 8308,
  Which: `oD`,
  version: 7,
  views: {
    outcome: `outcome`,
    stage: `stage`
    }
  };
export const _stateSourceMap = {
  2: {
    at: './index.rsh:99:3:after expr stmt',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './index.rsh:35:5:after expr stmt',
    fs: [],
    msg: null,
    who: 'Module'
    },
  4: {
    at: './index.rsh:44:7:after expr stmt',
    fs: [],
    msg: null,
    who: 'Module'
    },
  5: {
    at: './index.rsh:52:9:after expr stmt',
    fs: [],
    msg: null,
    who: 'Module'
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Admin": Admin,
  "PlayerAPI_alicePaysWager": PlayerAPI_alicePaysWager,
  "PlayerAPI_bobPaysWager": PlayerAPI_bobPaysWager,
  "PlayerAPI_sendOutcome": PlayerAPI_sendOutcome
  };
export const _APIs = {
  PlayerAPI: {
    alicePaysWager: PlayerAPI_alicePaysWager,
    bobPaysWager: PlayerAPI_bobPaysWager,
    sendOutcome: PlayerAPI_sendOutcome
    }
  };
