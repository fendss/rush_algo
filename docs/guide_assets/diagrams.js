(function () {
  const cell = (x, cls = "") => `<span class="cell ${cls}">${x}</span>`;
  const cells = (xs, hot = [], pivot = []) =>
    `<div class="array-row">${xs
      .map((x, i) => cell(x, pivot.includes(i) ? "pivot" : hot.includes(i) ? "hot" : ""))
      .join("")}</div>`;
  const card = (title, body) => `<div class="viz-card"><strong>${title}</strong>${body}</div>`;

  function replace(node, html) {
    const pre = node.closest("pre");
    const div = document.createElement("div");
    div.className = "guide-viz";
    div.innerHTML = html;
    pre.replaceWith(div);
  }

  window.enhanceGuideTextDiagrams = function enhanceGuideTextDiagrams() {
    document.querySelectorAll("pre.text > code, pre > code.language-text").forEach((node) => {
      const t = node.textContent.trim();

      if (t.includes("输入规模 N 增大时")) {
        replace(
          node,
          `<div class="guide-viz-title">复杂度增长：越往下越危险</div>
           <div class="viz-bars">
             ${[
               ["log N", 8],
               ["N", 24],
               ["N log N", 34],
               ["N^2", 58],
               ["2^N", 90],
               ["N!", 100],
             ]
               .map(
                 ([label, width]) => `
               <div class="viz-bar-row">
                 <div class="viz-bar-label">${label}</div>
                 <div class="viz-bar-track"><div class="viz-bar-fill" style="width:${width}%"></div></div>
               </div>`
               )
               .join("")}
           </div>`
        );
      } else if (t.startsWith("原数组：")) {
        replace(
          node,
          `<div class="guide-viz-title">归并排序：拆到最小，再逐层合并</div>
           <div class="viz-flow">
             ${card("原数组", cells([5, 2, 4, 1]))}
             ${card("拆成两半", `${cells([5, 2])}<br>${cells([4, 1])}`)}
             ${card("继续拆", `${cells([5])} ${cells([2])}<br>${cells([4])} ${cells([1])}`)}
             ${card("小段合并", `${cells([2, 5])}<br>${cells([1, 4])}`)}
             ${card("最终结果", cells([1, 2, 4, 5]))}
           </div>`
        );
      } else if (t.includes("目标：选 pivot = 5")) {
        replace(
          node,
          `<div class="guide-viz-title">快速排序 partition：pivot 一次到位</div>
           <div class="two-col">
             ${card("初始：pivot = 5", cells([5, 8, 1, 7, 3, 6, 2], [], [0]))}
             ${card("partition 后", cells([2, 3, 1, 5, 7, 6, 8], [], [3]))}
           </div>
           <p>左边都不大于 pivot，右边都不小于 pivot；接下来只递归左右两段。</p>`
        );
      } else if (t.startsWith("pivot = a[lo]")) {
        replace(
          node,
          `<div class="guide-viz-title">双指针切分：i 找大，j 找小</div>
           ${cells(["K", "R", "A", "T", "E", "L", "E"], [1, 5], [0])}
           <div class="formula-grid" style="margin-top:.8rem">
             <div class="formula-pill">i 向右找：a[i] &gt;= pivot</div>
             <div class="formula-pill">j 向左找：a[j] &lt;= pivot</div>
             <div class="formula-pill">交换 a[i] 和 a[j]</div>
             <div class="formula-pill">交叉后 pivot 与 a[j] 交换</div>
           </div>`
        );
      } else if (t.startsWith("处理重复键")) {
        replace(
          node,
          `<div class="guide-viz-title">三向切分：重复键一次收拢</div>
           <div class="segbar">
             <div class="seg-less">&lt; R<br><small>lo..lt-1</small></div>
             <div class="seg-eq">= R<br><small>lt..i-1</small></div>
             <div class="seg-unknown">unknown<br><small>i..gt</small></div>
             <div class="seg-more">&gt; R<br><small>gt+1..hi</small></div>
           </div>
           <div class="formula-grid" style="margin-top:.9rem">
             <div class="formula-pill">小于 R：swap(a[lt++], a[i++])</div>
             <div class="formula-pill">等于 R：i++</div>
             <div class="formula-pill">大于 R：swap(a[i], a[gt--])</div>
           </div>`
        );
      } else if (t.startsWith("index:")) {
        replace(
          node,
          `<div class="guide-viz-title">二叉堆：树形关系藏在数组下标里</div>
           ${cells([99, 70, 80, 20, 60, 50, 10])}
           <div class="formula-grid" style="margin-top:.8rem">
             <div class="formula-pill">parent(k) = k / 2</div>
             <div class="formula-pill">left(k) = 2k</div>
             <div class="formula-pill">right(k) = 2k + 1</div>
           </div>`
        );
      } else if (t.startsWith("插入到末尾")) {
        replace(
          node,
          `<div class="guide-viz-title">堆插入：新节点一路 swim</div>
           <div class="viz-cards">
             ${card("1. 插入末尾", cells([99, 70, 80, 20, 60, 50, 10, 85], [7]))}
             ${card("2. 85 > 20，交换", cells([99, 70, 80, 85, 60, 50, 10, 20], [3]))}
             ${card("3. 85 > 70，交换", cells([99, 85, 80, 70, 60, 50, 10, 20], [1]))}
             ${card("4. 85 < 99，停止", cells([99, 85, 80, 70, 60, 50, 10, 20], [0, 1]))}
           </div>`
        );
      } else if (t.startsWith("7 < 8")) {
        replace(
          node,
          `<div class="guide-viz-title">BST 查找路径：每一步排除半棵树</div>
           <div class="viz-flow">
             ${card("7 < 8", "去左子树")}
             ${card("7 > 3", "去右子树")}
             ${card("7 > 6", "继续向右")}
             ${card("命中", cell(7, "on"))}
           </div>`
        );
      } else if (t.includes("h                       x") && t.includes("B   C")) {
        replace(
          node,
          `<div class="guide-viz-title">左旋：修正右倾链接</div>
           <div class="tree-rotation">
             <div class="tree-box"><div class="mini-tree">
               <span class="node" style="left:42px;top:8px">h</span>
               <span class="node" style="left:96px;top:48px">x</span>
               <span class="node" style="left:68px;top:86px">B</span>
               <span class="node" style="left:126px;top:86px">C</span>
             </div></div>
             <div class="viz-arrow">→</div>
             <div class="tree-box"><div class="mini-tree">
               <span class="node" style="left:82px;top:8px">x</span>
               <span class="node" style="left:42px;top:48px">h</span>
               <span class="node" style="left:126px;top:48px">C</span>
               <span class="node" style="left:68px;top:86px">B</span>
             </div></div>
           </div>`
        );
      } else if (t.includes("      h                   x") && t.includes("A   B")) {
        replace(
          node,
          `<div class="guide-viz-title">右旋：修正连续左红链接</div>
           <div class="tree-rotation">
             <div class="tree-box"><div class="mini-tree">
               <span class="node" style="left:96px;top:8px">h</span>
               <span class="node" style="left:42px;top:48px">x</span>
               <span class="node" style="left:18px;top:86px">A</span>
               <span class="node" style="left:70px;top:86px">B</span>
             </div></div>
             <div class="viz-arrow">→</div>
             <div class="tree-box"><div class="mini-tree">
               <span class="node" style="left:82px;top:8px">x</span>
               <span class="node" style="left:42px;top:48px">A</span>
               <span class="node" style="left:126px;top:48px">h</span>
               <span class="node" style="left:102px;top:86px">B</span>
             </div></div>
           </div>`
        );
      } else if (t.startsWith("二维点集递归分割")) {
        replace(
          node,
          `<div class="guide-viz-title">kd-tree：交替按 x / y 分割空间</div>
           <div class="viz-plane">
             <span class="point" style="left:18%;top:28%"></span>
             <span class="point" style="left:34%;top:70%"></span>
             <span class="point" style="left:62%;top:32%"></span>
             <span class="point" style="left:78%;top:66%"></span>
           </div>`
        );
      } else if (t.startsWith("query 点 q")) {
        replace(
          node,
          `<div class="guide-viz-title">最近邻剪枝：矩形不可能更近就整棵剪掉</div>
           <div class="prune-rect">
             <span class="prune-query"></span>
             <span class="prune-circle"></span>
             <span class="prune-box"></span>
           </div>
           <p>若 dist(q, R) ≥ 当前最近距离 r，R 对应子树里不可能出现更优点。</p>`
        );
      } else if (t.startsWith("原边 s -> a")) {
        replace(
          node,
          `<div class="guide-viz-title">残量网络：一条边拆成“还能加”和“能撤回”</div>
           <div class="two-col">
             ${card("原边", "<b>s → a</b><br>capacity = 5, flow = 3")}
             ${card("正向残量", "<b>s → a = 2</b><br>还能再送 2")}
             ${card("反向残量", "<b>a → s = 3</b><br>最多撤回 3")}
           </div>`
        );
      } else if (t.startsWith("1. 在残量网络")) {
        replace(
          node,
          `<div class="guide-viz-title">增广路算法流程</div>
           <div class="viz-flow">
             ${card("1", "找 s 到 t 的残量路径")}
             ${card("2", "取路径最小残量 bottleneck")}
             ${card("3", "正向加流，反向减流")}
             ${card("4", "无路可找 ⇒ 最大流")}
           </div>`
        );
      } else if (t.startsWith("割把点分成")) {
        replace(
          node,
          `<div class="guide-viz-title">割：把 s 和 t 分到两侧</div>
           <div class="two-col">
             ${card("A side", "{ s, ... }")}
             ${card("B side", "{ ..., t }")}
           </div>
           <p><b>割容量</b>是所有从 A 指向 B 的边容量之和；最大流值等于最小割容量。</p>`
        );
      } else if (t.startsWith("如果 a[i-1]")) {
        replace(
          node,
          `<div class="guide-viz-title">LCS：一个格子只依赖左、上、左上</div>
           <div class="two-col">
             ${card("字符相等", `<div class="dp-grid"><div>↘</div><div></div><div></div><div>dp</div></div><code>dp[i][j] = dp[i-1][j-1] + 1</code>`)}
             ${card("字符不等", `<div class="dp-grid"><div></div><div>↑</div><div>←</div><div>dp</div></div><code>max(上, 左)</code>`)}
           </div>`
        );
      } else if (t.startsWith("当前物品 weight")) {
        replace(
          node,
          `<div class="guide-viz-title">0/1 背包为什么容量要倒序</div>
           <div class="two-col">
             ${card("倒序", "dp[10] 用旧 dp[7]<br>dp[9] 用旧 dp[6]<br><b>不会重复用当前物品</b>")}
             ${card("正序", "dp[3] 刚更新<br>dp[6] 又用新的 dp[3]<br><b>等价于同一物品用了两次</b>")}
           </div>`
        );
      } else if (t.startsWith("X <=p Y")) {
        replace(
          node,
          `<div class="guide-viz-title">规约方向</div>
           <div class="viz-flow">
             ${card("X 的实例", "多项式变换")}
             ${card("调用 Y 算法", "把 Y 当黑盒")}
             ${card("还原答案", "得到 X 的解")}
           </div>
           <p><b>X ≤p Y</b>：会解 Y，就会解 X。</p>`
        );
      } else if (t.startsWith("目标：maximize")) {
        replace(
          node,
          `<div class="guide-viz-title">线性规划：最优解可在极点取得</div>
           <div class="lp-plane"><div class="lp-poly"></div><div class="lp-star">★</div></div>
           <p>目标函数等值线平行移动，最后接触可行域的一个顶点。</p>`
        );
      } else if (t.startsWith("图中选一条未覆盖边")) {
        replace(
          node,
          `<div class="guide-viz-title">Vertex Cover 2-approx：一条边取两个端点</div>
           <div class="two-col">
             ${card("选未覆盖边", `${cell("u", "on")} <span class="viz-arrow" style="display:inline-flex">—</span> ${cell("v", "on")}`)}
             ${card("证明", "OPT ≥ |M|<br>ALG = 2|M| ≤ 2OPT")}
           </div>`
        );
      } else if (t.startsWith("左边记 0")) {
        replace(
          node,
          `<div class="guide-viz-title">Huffman 编码表</div>
           <div class="formula-grid">
             ${["a: 0", "b: 10", "c: 110", "d: 111"].map((x) => `<div class="formula-pill">${x}</div>`).join("")}
           </div>`
        );
      } else if (t.startsWith("读 bit 时从根走")) {
        replace(
          node,
          `<div class="guide-viz-title">前缀码解码</div>
           <div class="viz-flow">
             ${card("读 bit", "从根向左/右走")}
             ${card("到叶子", "输出一个字符")}
             ${card("回到根", "继续读下一段")}
           </div>
           <p>没有任何编码是另一个编码的前缀，所以不会歧义。</p>`
        );
      } else if (t.startsWith("bit array:")) {
        replace(
          node,
          `<div class="guide-viz-title">Bloom Filter：三个哈希位置都亮才“可能存在”</div>
           <div class="bitset">
             ${[0, 1, 0, 0, 1, 0, 1, 0, 0, 0].map((v, i) => `<span class="cell ${v ? "on" : "off"}">${i}<br>${v}</span>`).join("")}
           </div>
           <div class="formula-grid" style="margin-top:.9rem">
             <div class="formula-pill">插入 x：h1=1, h2=4, h3=6</div>
             <div class="formula-pill">有 0 ⇒ 一定不存在</div>
             <div class="formula-pill">全 1 ⇒ 可能存在</div>
           </div>`
        );
      } else if (t.startsWith("第 1 个元素：必选")) {
        replace(
          node,
          `<div class="guide-viz-title">Reservoir Sampling：越晚来的元素进入概率越小</div>
           <div class="prob-steps">
             ${["必选", "1/2 替换", "1/3 替换", "…", "1/i 替换"]
               .map((x, i) => `<div class="prob"><strong>第 ${i < 3 ? i + 1 : i === 3 ? "..." : "i"} 个</strong>${x}</div>`)
               .join("")}
           </div>`
        );
      }
    });
  };
})();
